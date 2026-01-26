# .claude/rules
# Claude가 MUI 기반 컴포넌트를 Atomic Design 패턴으로 설계하도록 안내하는 규칙입니다.

-   # MUI v7 기반 Atomic Design 컴포넌트 설계 규칙
    paths:
        - "src/components/**/*.{ts,tsx}"
    
    content: |
        당신은 MUI v7 디자인 시스템 전문가이자 Atomic Design 패턴 전문가입니다.
        
        기술 스택은 다음과 같습니다.
        - @mui/material@^7.0.0
        - @emotion/react
        - @emotion/styled
        - @mui/icons-material@^7.0.0
        
        ## Atomic Design 계층 구조
        
        bottom-up 방식으로 컴포넌트를 설계하며, 다음 계층 구조를 따릅니다.
        
        1. **Atoms** (`src/components/atoms/`)
           - MUI의 기본 컴포넌트를 그대로 재사용하는 경우, 빈 래퍼로 export만 수행합니다.
           - 예시: Button, TextField, Chip 등
           
        2. **Molecules** (`src/components/molecules/`)
           - 2~3개의 Atoms를 조합한 작은 기능 단위입니다.
           - 예시: SearchInput(TextField + IconButton), FormField(Label + TextField + HelperText)
           
        3. **Organisms** (`src/components/organisms/`)
           - Molecules와 Atoms를 조합한 독립적인 UI 섹션입니다.
           - 예시: Header, ProductCard, CommentList
           
        4. **Templates** (`src/components/templates/`)
           - Organisms를 배치하여 페이지의 레이아웃 구조를 정의합니다.
           - 실제 데이터 없이 와이어프레임 역할을 합니다.
           
        5. **Pages** (`src/pages/` 또는 `src/app/`)
           - Templates에 실제 데이터를 주입하여 완성된 페이지를 구현합니다.
        
        ## MUI 컴포넌트 재사용 규칙
        
        MUI에 이미 구현된 컴포넌트는 빈 래퍼로 export하여 계층 구조를 유지합니다.
```tsx
        // src/components/atoms/Card.tsx
        import { Card as MuiCard } from '@mui/material';
        
        export const Card = MuiCard;
```
        
        커스터마이징이 필요한 경우에만 styled() 또는 sx prop을 추가합니다.
```tsx
        // src/components/atoms/PrimaryButton.tsx
        import { Button } from '@mui/material';
        import { styled } from '@mui/material/styles';
        
        export const PrimaryButton = styled(Button)(({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }));
```
        
        ## 필수 준수 사항
        
        1. **레이아웃**
           - 반드시 `import Grid from '@mui/material/Grid2'`를 사용합니다.
           - 레거시 Grid 사용은 금지됩니다.
        
        2. **스타일링**
           - 간단한 레이아웃과 간격은 `sx` prop을 사용합니다.
           - 재사용성이 높은 스타일은 `styled()` 유틸리티를 사용합니다.
           - 모든 수치와 색상은 theme 객체에서 가져옵니다.
           - 예시: `theme.spacing(2)`, `theme.palette.primary.main`
        
        3. **아이콘**
           - `@mui/icons-material`에서 직접 import 합니다.
           - 아이콘 버튼에는 `aria-label`을 필수로 적용합니다.
        
        4. **타입 정의**
           - TypeScript `interface`로 Props 타입을 명시합니다.
           - `sx` prop을 받는 경우 `SxProps<Theme>` 타입을 사용합니다.
        
        5. **컴포넌트 구조**
           - 불필요한 `<div>` 대신 `Box` 또는 `Stack`을 사용합니다.
           - 각 컴포넌트는 단일 책임 원칙을 따릅니다.
        
        ## 계층별 설계 원칙
        
        - **Atoms**: MUI 기본 컴포넌트를 최대한 활용하고, 필요시에만 커스터마이징합니다.
        - **Molecules**: 하위 Atoms를 자유롭게 조합하여 의미 있는 기능 단위를 만듭니다.
        - **Organisms**: Molecules와 Atoms를 조합하여 독립적이고 재사용 가능한 UI 블록을 구성합니다.
        - **Templates**: Organisms 배치에 집중하며, Props를 통해 유연성을 확보합니다.
        - **Pages**: 실제 데이터와 비즈니스 로직을 연결합니다.
        
        각 계층에서 하위 계층의 컴포넌트를 자유롭게 사용할 수 있으며, 목적에 따라 적절한 계층을 선택하여 설계합니다.

-   # 비즈니스 로직 및 유틸리티 규칙
    paths:
        - "src/lib/**/*.ts"
        - "src/utils/**/*.ts"
        - "src/hooks/**/*.ts"
    content: |
        이 경로의 파일들은 순수 로직을 담당합니다.
        
        - @mui/material 또는 @emotion 관련 라이브러리를 import 하지 마십시오.
        - UI 의존성이 없는 순수 TypeScript 로직과 타입 정의에 집중하십시오.