# IR Traffic Simulation - Live Occupancy Tracker

A comprehensive real-time occupancy tracking system that simulates infrared (IR) sensor-based monitoring for recreational facilities. This Next.js application provides live monitoring and management of gym and badminton court occupancy using simulated gate sensors.

## Features

### Gym Monitoring

- **Real-time occupancy tracking** - Monitor the current number of people in the gym
- **Capacity management** - Visual progress bar showing occupancy vs. 50-person capacity
- **Live updates** - Automatic data refresh for real-time monitoring

### Badminton Court Management

- **Dual-gate sensor system** - Sophisticated entry/exit tracking using A1/B1 and A2/B2 sensors
- **Individual court status** - Track availability of Court 1 and Court 2
- **Smart gate logic** - Directional sensing (A→B for entry, B→A for exit)
- **Admin controls** - Manual reset functions and occupancy management
- **Cross-gate detection** - Warns about simultaneous gate usage
- **Timeout handling** - Auto-resets incomplete gate sequences after 10 seconds

### Advanced Gate Features

- **Sequence validation** - Prevents invalid sensor combinations
- **Comprehensive logging** - Detailed console output for debugging
- **Error handling** - Robust logic for edge cases and malformed sequences
- **Manual controls** - Admin buttons for resetting gates and occupancy counts

## Project Structure

```text
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── badminton/
│   │   │   │   └── route.ts        # Badminton API with gate logic
│   │   │   └── gym/
│   │   │       └── route.ts        # Gym occupancy API
│   │   ├── badminton/
│   │   │   └── page.tsx           # Badminton management interface
│   │   ├── gym/
│   │   │   └── page.tsx           # Gym monitoring interface
│   │   ├── layout.tsx             # Main layout
│   │   └── page.tsx               # Dashboard homepage
│   └── components/
│       ├── Header.tsx             # Navigation component
│       └── Footer.tsx             # Footer component
├── public/                        # Static assets
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ir-traffic-sim
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

### Dashboard

- View real-time occupancy for both gym and badminton facilities
- Quick overview of total active users and available courts
- Navigate to specific facility management pages

### Gym Page

- Monitor current occupancy with a visual capacity indicator
- Real-time updates showing people count out of 50 capacity

### Badminton Page

#### Gate Sensor Operation

1. **Entry Sequence**: Click A → B sensors to simulate someone entering
   - Gate 1: A1 → B1
   - Gate 2: A2 → B2

2. **Exit Sequence**: Click B → A sensors to simulate someone leaving
   - Gate 1: B1 → A1  
   - Gate 2: B2 → A2

#### Court Management

- Toggle individual court availability (Court 1 & Court 2)
- View real-time court status and utilisation rates

#### Admin Controls

- **Reset Gate Sequences**: Clear any pending/incomplete sensor sequences
- **Reset Occupancy Count**: Reset the total occupancy counter to zero

## Technical Implementation

### Gate Logic Algorithm

The badminton facility uses a sophisticated dual-gate sensor system:

```typescript
// Entry Detection: A→B sequence
if (lastSensor === "A1" && currentSensor === "B1") {
  occupancy++; // Person entered through Gate 1
}

// Exit Detection: B→A sequence  
if (lastSensor === "B1" && currentSensor === "A1") {
  occupancy--; // Person left through Gate 1
}
```

### Features Handled

- Valid entry/exit sequences
- Same sensor triggered twice (sequence reset)
- Cross-gate activity detection
- Timeout handling (10-second auto-reset)
- Comprehensive logging for debugging
- Manual admin controls for testing

### API Endpoints

#### Badminton API (`/api/badminton`)

- **GET**: Retrieve current occupancy and court status
- **POST**: Handle sensor triggers, court toggles, and admin actions
  - Actions: `triggerSensor`, `toggleCourt`, `resetGates`, `resetOccupancy`

#### Gym API (`/api/gym`)

- **GET**: Retrieve current gym occupancy
- **POST**: Update gym occupancy

## Technologies Used

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Heroicons (via SVG)
- **State Management**: React hooks (useState, useEffect)
- **API**: Next.js API routes

## Future Enhancements

- [ ] Database integration for persistent data
- [ ] Historical analytics and reporting
- [ ] Real hardware sensor integration
- [ ] WebSocket support for real-time updates
- [ ] User authentication and role-based access
- [ ] Mobile app companion
- [ ] Email/SMS notifications for capacity alerts
- [ ] Advanced reporting dashboard

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Development Notes

### Testing Gate Logic

To test the dual-gate sensor system:

1. **Single Entry**: A1 → B1 (should increment count by 1)
2. **Single Exit**: B1 → A1 (should decrement count by 1)
3. **Dual Entry**: A1 → B1, then A2 → B2 (should increment count by 2)
4. **Mixed Usage**: Try various combinations to test edge cases
5. **Reset Controls**: Use admin buttons to reset state during testing

### Console Logging

Monitor browser console for detailed sensor activity logs:

- Successful entries/exits
- Warnings for edge cases
- Sequence resets and timeouts
- Multi-gate activity detection

---

Built with ❤️ for efficient facility management and IoT simulation.
