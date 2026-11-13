# Williams & Williams LLC – Image Generation Prompts & Catalog

This document provides the exact prompts, dimensions, aspect ratios, and design specifications used for generating and maintaining the visual assets for the **Williams & Williams LLC – Zoning Solutions** mobile web application.

---

## 1. Brand Visual Guidelines for Image Generation
- **Style**: Ultra-realistic architectural & urban photography, documentary editorial style.
- **Lighting**: Cool daylight, golden hour blue-hour transition, soft diffuse overcast lighting.
- **Color Grade**: Cool desaturated navy (#1F2A44), steel blue (#3D4D7C), soft slate mist (#B7C3DA, #7D90B5), with subtle warm architectural interior accent lights.
- **Negative Space**: Clean composition with upper or lower third negative space for text and glass card overlays.
- **No Artifacts**: Zero watermarks, zero fake gibberish text, natural hands and anatomies, straight vertical perspective lines (tilt-shift look).

---

## 2. Prompts Catalog

### 1. `hero-chicago-skyline`
- **File**: `/src/assets/images/hero-chicago-skyline.jpg`
- **Type**: Hero banner (16:9 / 2:1)
- **Prompt**:
  > *Ultra-realistic architectural photography of the Chicago skyline at blue hour viewed from Lake Michigan. Glowing high-rise towers, Willis Tower and modern architectural silhouettes reflecting on calm blue water. Atmospheric cool steel blue and deep navy tones (#1F2A44, #3D4D7C), crisp twilight sky with gradient into dusk, cinematic composition with negative space in lower half for UI glass overlay. Shot on Hasselblad H6D-100c, 35mm tilt-shift lens, sharp focus, 8k resolution, photorealistic.*

### 2. `hero-blueprints-team`
- **File**: `/src/assets/images/hero-blueprints-team.jpg`
- **Type**: Hero / Service Card
- **Prompt**:
  > *Professional zoning consultants and architects in a bright modern Chicago design studio collaborating over large-format printed urban zoning maps, architectural blueprints, and cadastral survey drawings. Three professionals (diverse, dressed in modern smart business attire) reviewing site plans with scaled rulers and tablet computers. Natural soft window lighting, cool blue-grey office interior, shallow depth of field, premium corporate documentary photography.*

### 3. `service-zoning-analysis`
- **File**: `/src/assets/images/service-zoning-analysis.jpg`
- **Type**: Service Card & Detail Hero
- **Prompt**:
  > *Close-up architectural documentary shot of an urban planner's desk in Chicago. High-end laptop displaying colorful GIS municipal zoning district overlay maps alongside physical printed architectural plot drawings, architectural scale ruler, and municipal zoning ordinance binder. Clean minimal desk, soft morning side-light, cool navy and slate tones, hyper-detailed textures.*

### 4. `service-appeals-hearing`
- **File**: `/src/assets/images/service-appeals-hearing.jpg`
- **Type**: Service Card & Detail Hero
- **Prompt**:
  > *Modern municipal zoning board hearing room in Chicago City Hall. Professional zoning attorney and expert consultant presenting 3D architectural site elevation boards to a seated municipal zoning board of appeals. Clean wood paneling, civic dignity, professional courtroom lighting, documentary photojournalism style, cool tone grade.*

### 5. `service-permits`
- **File**: `/src/assets/images/service-permits.svg` (and fallback `.jpg`)
- **Type**: Service Card
- **Prompt**:
  > *Top-down architectural still life of official City of Chicago Department of Buildings permit application documentation with red approval stamps, rolled building plans, digital tablet displaying building code compliance, and a clean white engineer hard hat. Soft diffuse office lighting, crisp details, cool corporate navy aesthetic.*

### 6. `service-feasibility`
- **File**: `/src/assets/images/service-feasibility.svg` (and fallback `.jpg`)
- **Type**: Service Card
- **Prompt**:
  > *Commercial real estate developer and civil engineer standing at the edge of an urban Chicago redevelopment infill lot with modern city skyline in the background. Holding a digital rugged tablet and laser survey transit tripod, reviewing site topography and zoning envelope. Golden hour light hitting the Chicago brick facades.*

### 7. `service-urban-planning`
- **File**: `/src/assets/images/service-urban-planning.jpg`
- **Type**: Service Card & Detail Hero
- **Prompt**:
  > *Elevated drone aerial photograph of a sustainable mixed-use transit-oriented development neighborhood in Chicago. Green roofs, pedestrian walkways, protected bike lanes, modern mid-rise residential apartments integrated with ground-floor retail. Crisp morning light, clean architectural lines, cool slate and blue color palette.*

### 8. `service-compliance`
- **File**: `/src/assets/images/service-compliance.jpg`
- **Type**: Service Card
- **Prompt**:
  > *Architectural compliance and building code inspection scene. An open Chicago Municipal Code title 17 zoning ordinance reference book, digital tablet with digital audit checklist, and architectural drawings on a stone meeting table in a high-rise conference room overlooking the Chicago River.*

### 9. `service-community`
- **File**: `/src/assets/images/service-community.jpg`
- **Type**: Service Card
- **Prompt**:
  > *Engaging community consultation meeting in a contemporary neighborhood civic center. A zoning consultant presenting a detailed physical miniature architectural model of a proposed community development to engaged neighborhood residents and stakeholders. Warm interactive atmosphere with professional civic lighting.*

### 10. `service-construction`
- **File**: `/src/assets/images/service-construction.jpg`
- **Type**: Service Card & Portfolio Hero
- **Prompt**:
  > *Modern luxury multi-family residential building under construction in Chicago West Loop. Steel framing, floor-to-ceiling glass curtain wall installation, construction crane silhouetted against twilight sky. Architectural documentary photography, sharp geometric lines, cool twilight color grade.*

### 11. `portfolio-current-1..3`
- **Files**: `/src/assets/images/portfolio-current-1.svg` to `3.svg`
- **Type**: Project Showcase Cards
- **Prompts**:
  1. *Fulton Market luxury mixed-use boutique timber office building under active construction with modern glass facade.*
  2. *Lincoln Park contemporary residential 4-unit luxury brownstone addition with steel bay windows.*
  3. *Logan Square transit-oriented mixed-use development showing ground floor retail envelope framing.*

### 12. `portfolio-past-1..3`
- **Files**: `/src/assets/images/portfolio-past-1.svg` to `3.svg`
- **Type**: Completed Projects Showcase
- **Prompts**:
  1. *Finished modern Scandinavian-inspired single family residence in Bucktown with approved rear yard zoning variance.*
  2. *Adaptive reuse commercial brewery and creative office space in an historic Chicago brick warehouse.*
  3. *Boutique hotel and retail development in the West Loop with full special-use zoning approval.*

### 13. Chicago Neighborhoods (`area-loop`, `area-lincoln-park`, `area-west-loop`, `area-hyde-park`)
- **Files**: `/src/assets/images/area-*.jpg` / `.svg`
- **Type**: Neighborhood Discovery Cards
- **Prompts**:
  - `area-loop`: *Chicago downtown Loop historic canyon street with 'L' train tracks and historic limestone architecture.*
  - `area-lincoln-park`: *Tree-lined residential Armitage Avenue in Lincoln Park with historic brick row houses and boutique cafes.*
  - `area-west-loop`: *Fulton Market district converted brick industrial buildings, cobblestone streets, modern glass towers.*
  - `area-hyde-park`: *Historic 57th street near University of Chicago, leafy canopy, Gothic revival stone and mid-century apartments.*

### 14. Zoning Categories (`zoning-residential`, `zoning-commercial`, `zoning-industrial`, `zoning-mixed-use`, `zoning-agricultural`)
- **Files**: `/src/assets/images/zoning-*.svg`
- **Type**: Category Filter Chips & Cards
- **Theme**: Precision architectural drafting diagrams highlighting building footprints, setback envelopes, FAR ratios, and lot classifications in `#1F2A44`, `#3D4D7C`, and `#B7C3DA`.

### 15. Zoning News (`news-1` to `news-4`)
- **Files**: `/src/assets/images/news-1.svg` to `4.svg`
- **Type**: Editorial News Cards
- **Prompts**:
  1. *Chicago City Council approves new transit-served location parking mandate reforms.*
  2. *Affordable Requirements Ordinance (ARO) updates for 2026-2027 development projects.*
  3. *Connected Communities Ordinance: expanded zoning relief zones.*
  4. *Streamlined commercial-to-residential adaptive reuse zoning guidelines.*

### 16. `about-founder`
- **File**: `/src/assets/images/about-founder.svg`
- **Type**: Executive Bio Avatar / Portrait
- **Prompt**:
  > *Executive portrait of senior urban zoning consultant and firm principal in Chicago. Confident, warm, knowledgeable expression, seated in a high-rise office with architectural blueprints on the desk and Chicago skyline through the window. Dressed in tailored navy blazer.*

### 17. `onboarding-1..3`
- **Files**: `/src/assets/images/onboarding-1.jpg` to `3.jpg`
- **Type**: Full-screen App Onboarding Carousel
- **Prompts**:
  1. *Chicago cityscape with Lake Michigan horizon - 'Navigating complex zoning with ease'.*
  2. *Architect reviewing digital permit tracker on iPad - 'Track every permit and appeal'.*
  3. *Senior consultant meeting client in modern conference room - 'Talk to a zoning expert'.*

### 18. `testimonial-avatars` (1 to 4)
- **Files**: `/src/assets/images/avatar-1.svg` to `4.svg`
- **Type**: Client Review Avatars
- **Theme**: Clean vector portrait badges for Chicago real estate developers, homeowners, and general contractors.

---

## 3. Replacement Instructions
To update or replace any asset:
1. Generate the new image matching the dimensions and color tone specified above.
2. Save it directly to `/src/assets/images/<filename>.<ext>`.
3. Update the entry in `/src/data/images.ts`.

