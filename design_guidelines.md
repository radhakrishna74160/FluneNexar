# NEXAR AI Manager - Design Guidelines

## Design Approach
**Reference-Based Approach**: Futuristic AI interface inspired by sci-fi applications (Iron Man's JARVIS UI, Cyberpunk 2077 interfaces) combined with modern chat applications (ChatGPT, Claude) for usability.

## Core Design Principles
- **Futuristic Aesthetics**: Dark, high-tech interface with neon accents and energy effects
- **Glassmorphism**: Translucent panels with blur effects for depth
- **Animated Intelligence**: Everything should feel alive and responsive
- **Visual Hierarchy**: Manager (Nexar) as central focus, assistants as supporting elements

---

## Typography System

**Primary Font**: Space Grotesk or Orbitron (futuristic, tech-forward)
**Secondary Font**: Inter or Poppins (readability for chat/body text)

**Scale**:
- Hero/Manager Name: text-5xl to text-6xl, font-bold
- Section Headers: text-3xl, font-semibold
- Chat Messages: text-base, font-normal
- Assistant Names: text-sm, font-medium, uppercase, tracking-wide
- UI Labels: text-xs, font-medium

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 (p-4, gap-6, mb-8, etc.)

**Grid Structure**:
- Main chat area: Full width with max-w-4xl container
- Manager avatar: Centered with w-24 h-24 to w-32 h-32
- 5 Assistants: Grid layout (grid-cols-5 on desktop, grid-cols-2 on mobile, gap-4)
- Sidebar customization: w-80 fixed width panel

**Viewport Management**:
- Login/Auth pages: Full viewport (min-h-screen) with centered content
- Chat interface: Full height with sticky header and scrollable chat area
- Manager avatar: Fixed position near top, floating effect

---

## Component Library

### 1. Authentication Pages
**Login/Signup Screen**:
- Full-screen dark gradient background with animated particle field
- Centered glass card (max-w-md, p-8, rounded-2xl)
- Google sign-in button with icon and glow effect
- "NEXAR" logo at top with subtle pulse animation
- Tagline: "Your AI Manager" in gradient text

### 2. Manager Avatar (Nexar)
**Central AI Avatar**:
- Circular glowing avatar (w-32 h-32) with 3-layer composition:
  - Outer ring: Rotating energy pulse (animated border)
  - Middle layer: Glassmorphic container with blur
  - Inner core: Icon or image with glow
- Floating animation (gentle up/down motion)
- Active state: Intense glow + particle burst when speaking
- Idle state: Subtle breathing pulse effect

### 3. Chat Interface
**Message Bubbles**:
- User messages: Right-aligned, solid background with slight glow, rounded-2xl, p-4
- AI responses: Left-aligned, glassmorphic with backdrop-blur, rounded-2xl, p-4
- Typing indicator: Three animated dots with wave effect
- Timestamps: text-xs, opacity-60, mt-1

**Chat Container**:
- Dark background with subtle grid pattern or particle effect
- Messages in flex-col with gap-4
- Scrollable area with custom scrollbar (thin, glowing)
- Input area: Sticky bottom, glassmorphic bar with blur, p-6

### 4. AI Assistants Panel
**5 Assistant Cards** (Thinker, Writer, Coder, Researcher, Designer):
- Grid layout: grid-cols-5 (desktop), grid-cols-2/3 (mobile)
- Each card: Glassmorphic rounded-xl, p-4, aspect-square or vertical
- Components per card:
  - Icon (specific to role): text-3xl or w-12 h-12
  - Assistant name: text-sm, uppercase, tracking-wide
  - Status indicator: Small dot (idle/active/complete) with glow
  - Progress ring: Circular progress animation when working
- Glow effect when active: border with neon gradient
- Completion animation: Check mark + particle burst

### 5. Customization Panel
**Settings Sidebar** (slide-in from right):
- Width: w-80, full-height
- Glassmorphic background with backdrop-blur
- Sections:
  - Manager Name Input: Glowing input field
  - Avatar Selection: Grid of avatar options
  - Color Theme Picker: 4-6 gradient swatches
  - Personality Sliders: Formal ↔ Casual, Brief ↔ Detailed
- Save button: Gradient background with glow, full-width

### 6. Navigation & Header
**Top Bar**:
- Sticky header: backdrop-blur-lg, border-b with glow
- Left: NEXAR logo + current manager name
- Right: User avatar, settings icon, logout button
- Height: h-16, items center-aligned

### 7. Input Area
**Chat Input**:
- Glassmorphic container at bottom: p-6, backdrop-blur
- Multi-line textarea: Dark background, rounded-xl, p-4, ring on focus
- Send button: Gradient background (blue/purple), rounded-full, w-12 h-12
- Microphone icon: For voice input (optional feature)
- Character/token counter: text-xs, opacity-60

### 8. Loading & Progress States
**Assistant Working States**:
- Skeleton loader: Shimmer effect with gradient
- Progress rings: Circular SVG animation, neon stroke
- Particle effects: Small glowing dots around active assistants
- Manager processing: Rotating halo + pulsing core

---

## Visual Effects & Animations

### Background Effects
- Animated particle field using React-Tsparticles (sparse, slow-moving)
- Subtle grid pattern with glow at intersections
- Radial gradient from center (darkest) to edges

### Micro-Animations
- Button hover: Subtle scale (1.02) + increased glow
- Card hover: Lift effect (translateY(-4px)) + stronger glow
- Message appear: Fade in + slide up (50px)
- Voice speaking: Avatar pulse + concentric ring waves
- Typing: Three-dot wave animation

### Transition Effects
- Page transitions: Fade + slight scale
- Panel slides: Smooth slide-in/out (300ms ease)
- Assistant activation: Glow fade-in (200ms) + scale pulse

### No Hover States for Blurred Buttons
Buttons on glassmorphic/blurred backgrounds have no custom hover effects—default button states only

---

## Glassmorphism Implementation
- Background: bg-white/5 or bg-black/20
- Backdrop blur: backdrop-blur-lg or backdrop-blur-xl
- Border: border border-white/10 or gradient border
- Shadow: Soft glow with box-shadow (colored, 0 0 20px rgba())

---

## Responsive Behavior

**Desktop (lg+)**:
- Full sidebar visible
- 5-column assistant grid
- Spacious chat bubbles (max-w-2xl)
- Manager avatar larger (w-32 h-32)

**Tablet (md)**:
- Collapsible sidebar (hamburger menu)
- 3-column assistant grid
- Medium chat bubbles

**Mobile (base)**:
- Hidden sidebar (slide-in menu)
- 2-column assistant grid or vertical stack
- Full-width chat bubbles
- Smaller manager avatar (w-20 h-20)
- Floating action button for settings

---

## Images

**Login/Hero Background**: 
- Abstract AI neural network visualization or futuristic cityscape
- Dark with blue/purple tones, slight motion blur
- Overlaid with dark gradient (opacity-80) for text legibility
- Full viewport background (bg-cover, bg-center)

**Manager Avatar Options**:
- 6-8 abstract AI face icons (geometric, crystalline, holographic)
- Each with unique color accent matching theme options

**No large hero image in chat interface** - focus is on functional UI and avatar