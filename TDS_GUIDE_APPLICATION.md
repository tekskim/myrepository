# Figma TDS Guide 적용 방법

## 1. Figma에서 TDS Guide 정보 가져오기

### 방법 A: Figma MCP 도구 사용 (권장)

1. **Figma 파일 URL에서 File Key 추출**
   - Figma 파일 URL 형식: `https://www.figma.com/design/[FILE_KEY]/[FILE_NAME]`
   - 예: `https://www.figma.com/design/abc123xyz/TDS-Guide` → File Key: `abc123xyz`

2. **Figma MCP 도구로 디자인 시스템 정보 가져오기**
   ```javascript
   // Figma에서 변수 정의 가져오기
   mcp_Figma_get_variable_defs(fileKey, nodeId)
   
   // 디자인 컨텍스트 가져오기
   mcp_Figma_get_design_context(fileKey, nodeId)
   ```

3. **TDS Guide 페이지의 Node ID 찾기**
   - Figma에서 TDS Guide 페이지 선택
   - URL에서 node-id 파라미터 확인: `?node-id=123:456`
   - 또는 페이지 전체를 가져오려면 페이지 ID 사용 (예: `0:1`)

### 방법 B: Figma API 직접 사용

1. **Figma Personal Access Token 생성**
   - Figma → Settings → Personal Access Tokens
   - 새 토큰 생성

2. **Figma REST API 호출**
   ```bash
   # 파일 정보 가져오기
   curl -H 'X-Figma-Token: YOUR_TOKEN' \
     'https://api.figma.com/v1/files/FILE_KEY'
   
   # 변수 가져오기
   curl -H 'X-Figma-Token: YOUR_TOKEN' \
     'https://api.figma.com/v1/files/FILE_KEY/variables/local'
   ```

### 방법 C: Figma 플러그인 사용

1. **Figma에서 "Design Tokens" 플러그인 설치**
2. 플러그인으로 토큰을 JSON/CSV로 export
3. 프로젝트에 import

## 2. TDS Guide 정보 추출 항목

다음 정보를 Figma에서 추출해야 합니다:

### 색상 (Colors)
- Primary colors (main, hover, active states)
- Background colors (primary, secondary, tertiary)
- Text colors (primary, secondary, tertiary)
- Border colors
- Semantic colors (success, error, warning, info)

### 타이포그래피 (Typography)
- Font family
- Font sizes (xs, sm, base, lg, xl, 2xl, 3xl, etc.)
- Font weights (regular, medium, semibold, bold)
- Line heights
- Letter spacing

### 간격 (Spacing)
- Spacing scale (보통 4px 또는 8px 그리드)
- Padding values
- Margin values
- Gap values

### 반경 (Border Radius)
- Small, medium, large radius values

### 그림자 (Shadows)
- Elevation levels
- Shadow values

### 전환 (Transitions)
- Duration values
- Easing functions

## 3. CSS 변수로 적용하기

### Step 1: Figma에서 값 추출

Figma TDS Guide에서 각 토큰의 실제 값을 확인합니다.

예시:
- Primary Color: `#007AFF` (Figma에서 확인)
- Background Secondary: `#F5F5F7` (Figma에서 확인)
- Font Size Base: `14px` (Figma에서 확인)

### Step 2: CSS 변수 업데이트

`styles.css`의 `:root` 섹션을 Figma 값으로 업데이트:

```css
:root {
    /* Figma TDS Guide에서 가져온 실제 값으로 업데이트 */
    --tds-color-primary: #007AFF; /* Figma 값 */
    --tds-color-bg-secondary: #F5F5F7; /* Figma 값 */
    /* ... 기타 값들 */
}
```

### Step 3: 컴포넌트 스타일 확인

Figma TDS Guide의 컴포넌트 예시를 참고하여:
- Button 스타일
- Input 스타일
- Card 스타일
- 등등

## 4. 실제 적용 예시

### Figma에서 정보 가져오기

```javascript
// 1. Figma 파일 열기
// 2. TDS Guide 페이지 선택
// 3. MCP 도구로 정보 가져오기

// 예시: 변수 정의 가져오기
const variables = await mcp_Figma_get_variable_defs(
    fileKey: "YOUR_FILE_KEY",
    nodeId: "TDS_GUIDE_NODE_ID"
);

// 결과 예시:
// {
//   "color/primary": "#007AFF",
//   "color/bg/secondary": "#F5F5F7",
//   "spacing/md": "16px",
//   ...
// }
```

### CSS에 적용

```css
:root {
    /* Figma에서 가져온 실제 값 */
    --tds-color-primary: #007AFF;
    --tds-color-primary-hover: #0051D5;
    --tds-color-primary-active: #0040A8;
    
    /* Figma Spacing Scale */
    --tds-spacing-xs: 4px;
    --tds-spacing-sm: 8px;
    --tds-spacing-md: 16px;
    --tds-spacing-lg: 24px;
    --tds-spacing-xl: 32px;
    
    /* 기타... */
}
```

## 5. 자동화 스크립트 (선택사항)

Figma API를 사용하여 자동으로 CSS 변수를 생성하는 스크립트:

```javascript
// figma-to-css.js
const figmaToken = 'YOUR_TOKEN';
const fileKey = 'YOUR_FILE_KEY';

async function fetchFigmaVariables() {
    const response = await fetch(
        `https://api.figma.com/v1/files/${fileKey}/variables/local`,
        {
            headers: { 'X-Figma-Token': figmaToken }
        }
    );
    const data = await response.json();
    
    // CSS 변수로 변환
    const cssVars = Object.entries(data.meta.variables)
        .map(([key, value]) => {
            const cssKey = key.replace(/\//g, '-');
            return `    --tds-${cssKey}: ${value.values};`;
        })
        .join('\n');
    
    return `:root {\n${cssVars}\n}`;
}
```

## 6. 체크리스트

- [ ] Figma TDS Guide 파일 URL 확인
- [ ] File Key 추출
- [ ] TDS Guide 페이지 Node ID 확인
- [ ] MCP 도구 또는 API로 변수 정보 가져오기
- [ ] 색상 값 추출 및 CSS 변수 업데이트
- [ ] 타이포그래피 값 추출 및 CSS 변수 업데이트
- [ ] 간격 값 추출 및 CSS 변수 업데이트
- [ ] 컴포넌트 스타일 확인 및 적용
- [ ] 브라우저에서 시각적 확인

## 7. 도움이 필요한 경우

Figma TDS Guide의 File Key와 Node ID를 제공해주시면, 자동으로 정보를 가져와서 CSS에 적용해드릴 수 있습니다.

**필요한 정보:**
- Figma TDS Guide 파일 URL 또는 File Key
- TDS Guide 페이지의 Node ID (선택사항)

