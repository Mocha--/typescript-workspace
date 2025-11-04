Build a parcel tracking status page

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 CONTEXT
- This is an app that shows users the status of their parcel tracking
- The end users are consumers
- The app will help reduce the supporting calls because users can come to the app and check their tracking

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ FUNCTIONAL REQUIREMENTS
What the feature must DO:
- Here are the states of a parcel
  - Order Placed
  - Processing
  - Shipped
  - Out for Delivery
  - Delivered
- use a wizard to display the states unless you have better alternatives
  - use horizontal on desktop
  - if not enough space on mobile, use vertical
- show how far away for each step
- Customers especially panic when a package sits in one status for more than 2 days
- The UI should be mobile friendly or mobile first
- The app is used quite often by users
- the app should have a live map of where the current parcel is
- each tracking stage should be interactive
  - clicking it should show the status on the map

User interactions:
- input their tracking number
- submit the tracking number
- then the app should show the tracking status

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️ TECHNICAL REQUIREMENTS
- Framework: React
- Styling: CSS Module
- State Management: useState / Context
- Data Source: Mock data
- TypeScript: Yes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 UI/UX REQUIREMENTS
Visual Style:
- Modern
- Color scheme: dark

Responsive Behavior:
- Mobile: make mobile first
- Desktop: less desktop users

Accessibility:
- Keyboard navigation / Screen reader support / ARIA labels

States to Design:
- Loading state
- Error state
- Empty state
- Success state

Animations/Interactions:
- page enter animation after loading the tracking status
- animation / spinner while data is being submitted
- hover states

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚫 CONSTRAINTS
- Performance: minimal bundle size
- Browser Support: Modern browsers
- Libraries to Avoid: with minimal dependencies

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📤 DESIRED OUTPUT
- a working app
- one file should have only one component
- Component code with comments
- Explanation of key design decisions
- Any setup instructions
```
