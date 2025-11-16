# Anomaly Detection for Solar Panels - Teaching Guide

**Full-Stack Development Course - Data Analysis Module**

---

## Overview

This lesson teaches students **window-based anomaly detection** using real solar panel data from an authenticated user dashboard.

### What Students Learn
- Window-based statistical analysis
- React state management
- API integration with RTK Query
- Real-time threshold tuning
- Data visualization

### Time Required
60-90 minutes

---

## Project Architecture

### User Flow

```
1. User signs in → Clerk authentication
2. Navigate to /dashboard
3. Fetch user's solar unit ID
4. Fetch 7 days of energy records
5. Run anomaly detection
6. Display results with interactive controls
```

### Key Files

**Algorithm:**
- `src/lib/anomalyDetection.js` - Detection functions
- `src/lib/sampleAnomalyData.js` - Test scenarios

**Dashboard Components:**
- `src/pages/dashboard/components/DataCard.jsx` - Main card with controls
- `src/pages/dashboard/components/EnergyProductionCard.jsx` - Individual day card
- `src/pages/dashboard/components/EnergyProductionCards.jsx` - Card grid
- `src/pages/dashboard/components/EnergyTab.jsx` - All/Anomaly tabs

**State Management:**
- `src/lib/redux/features/uiSlice.js` - UI state (tab selection)
- `src/lib/redux/query.js` - API data fetching

---

## The Core Concept

### The Problem
Solar panels generate energy daily. How do we automatically detect "bad days" that indicate failures or issues?

### The Solution
**Window-based detection:** Compare each day against the 7-day window average.

**Rule:**
> If a day is **40% or more below the weekly average** → Flag as anomaly

**Why this works:**
- Adapts to context (winter/summer, location)
- Simple math (averaging, percentages)
- Matches UI's 7-day view
- Easy to explain

---

## The Algorithm

### Three Steps

```javascript
// Step 1: Calculate window average
average = sum(all 7 days) / 7

// Step 2: Calculate each day's deviation
deviation% = ((average - today) / average) × 100

// Step 3: Check threshold
if (deviation% > 40%) → ANOMALY
```

### Complete Example

**Data:**
```
Mon: 35 kWh
Tue: 34 kWh
Wed: 36 kWh
Thu: 18 kWh  ← Check this
Fri: 33 kWh
Sat: 35 kWh
Sun: 34 kWh
```

**Calculation:**
```
Average = (35+34+36+18+33+35+34) / 7 = 32.1 kWh

Thursday: (32.1 - 18) / 32.1 × 100 = 43.9%

43.9% > 40% ✓ → ANOMALY!
```

---

## Getting Started

### 1. Start Application
```bash
npm run dev
```

### 2. Sign In
- Go to `http://localhost:5173`
- Sign in with test user (must have solar unit assigned)

### 3. Navigate to Dashboard
- Click "Dashboard" in navigation
- See "Solar Energy Production" card
- Open Console (F12) for detailed logs

---

## Dashboard UI Tour

### Main Components

**Header:**
- Title: "Solar Energy Production"
- Subtitle: "Daily energy output for the past 7 days"

**Controls (Right Side):**
1. **Detection Method Dropdown**
   - Window Average (7-day) ← Default
   - Absolute Threshold

2. **Threshold Slider** (when applicable)
   - Range: 20-60%
   - Default: 40%
   - Shows current value

3. **Absolute Min Slider** (when applicable)
   - Range: 1-15 kWh
   - Default: 5 kWh

**Stats Banner (Blue Box):**
- Window Average: X kWh
- Range: Min - Max kWh
- Anomalies: Count (color-coded: green=0, red>0)

**Tab Filters:**
- **All**: Show all 7 days
- **Anomaly**: Show only flagged days

**Energy Cards:**
- Normal: Gray border, blue text
- Anomaly: Red border, red text, "Anomaly" badge
- Click → Tooltip with reason

---

## Teaching Sequence

### Part 1: Introduction (10 min)

**Whiteboard Discussion:**

Ask: "How would you detect problems in solar panel data?"

Write:
```
What is an anomaly?
- Unusual data point
- Deviates from pattern
- Indicates problem

Examples:
- Zero production (failure)
- Very low (shading, dirt)
- Unusual pattern (sensor error)
```

**Demo Dashboard:**
1. Sign in
2. Go to Dashboard
3. Point to energy cards
4. Click anomaly → Show tooltip

---

### Part 2: Manual Calculation (20 min)

**Whiteboard Exercise:**

```
Data: [30, 32, 31, 15, 29, 31, 30] kWh
Threshold: 40%

Step 1: Sum = 198 kWh
Step 2: Average = 198 / 7 = 28.3 kWh
Step 3: Day 4 deviation = (28.3-15) / 28.3 × 100 = 47%
Step 4: 47% > 40% ✓ → ANOMALY
```

**Student Practice:**

Give: `[25, 27, 26, 24, 8, 26, 25]`

Have students calculate:
1. Average (23 kWh)
2. Day 5 deviation (65.2%)
3. Is it anomaly? (Yes)

---

### Part 3: Live UI Demo (15 min)

**1. Detection Methods**

Show each method:
- **Window Average**: Compares to weekly avg (default)
- **Absolute**: Simple rule (< 5 kWh = fail)

Switch between and show different results.

---

**2. Threshold Slider**

Demo sensitivity:

**20%**: Very sensitive
- Catches small deviations
- More anomalies flagged
- Ask: "Too many false alarms?"

**40%**: Balanced (default)
- Significant issues only
- Fewer false positives

**60%**: Less sensitive
- Only major failures
- Ask: "Might we miss problems?"

---

**3. Tab Filtering**

**All Tab:**
- Shows all 7 days
- Anomalies marked red

**Anomaly Tab:**
- Filters to flagged only
- Technician view

---

**4. Card Interaction**

Click anomaly card:
- Popup appears
- "Why is this an anomaly?"
- Shows exact reason with %

---

**5. Console Logs**

Show students (F12):
```javascript
Anomaly Detection Stats: {
  windowAverage: "32.1",
  anomalyCount: 2,
  anomalyRate: "28.6%"
}

Data with Anomalies: [
  {
    totalEnergy: 18,
    hasAnomaly: true,
    deviationPercent: "43.9",
    anomalyReason: "43.9% below window average"
  }
]
```

Point out:
- Negative deviation = above average (good)
- Positive = below average
- Large positive = anomaly

---

### Part 4: Code Walkthrough (25 min)

#### File 1: Detection Algorithm

**Open:** `src/lib/anomalyDetection.js`

**Lines 27-29: Calculate Average**
```javascript
const totalEnergy = records.reduce((sum, record) =>
  sum + record.totalEnergy, 0
);
const averageEnergy = totalEnergy / records.length;
```

Teach: `.reduce()` sums all values

---

**Lines 32-39: Check Each Day**
```javascript
const deviationPercent = ((averageEnergy - energy) / averageEnergy) * 100;
const isAnomaly = deviationPercent > thresholdPercent;
```

Teach:
- Formula for % deviation
- Positive = below avg
- Negative = above avg

---

**Lines 41-52: Return Data**
```javascript
return {
  ...record,
  hasAnomaly: isAnomaly,
  anomalyReason: isAnomaly ? `${deviation}% below average` : null,
  windowAverage: averageEnergy.toFixed(1),
  deviationPercent: deviationPercent.toFixed(1)
};
```

Teach:
- Spread operator `...record`
- Add anomaly flags
- `.toFixed(1)` for rounding

---

#### File 2: Dashboard Component

**Open:** `src/pages/dashboard/components/DataCard.jsx`

**Lines 10-17: State**
```javascript
const [detectionMethod, setDetectionMethod] = useState('windowAverage');
const [thresholdPercent, setThresholdPercent] = useState(40);
const [absoluteMin, setAbsoluteMin] = useState(5);
```

Teach: React hooks for UI controls

---

**Lines 27-30: API Fetch**
```javascript
const { data } = useGetEnergyGenerationRecordsBySolarUnitQuery({
  id: solarUnitId,
  groupBy: "date",
  limit: 7
});
```

Teach: RTK Query for data fetching

---

**Lines 61-66: Run Detection**
```javascript
const dataWithAnomalies = detectAnomalies(last7Days, detectionMethod, {
  windowThresholdPercent: thresholdPercent,
  absoluteThreshold: absoluteMin
});
```

Teach: Pass method and options to algorithm

---

**Lines 68-77: Transform for UI**
```javascript
const energyProductionData = dataWithAnomalies.map((el) => ({
  day: format(toDate(el._id.date), "EEE"),
  production: el.totalEnergy,
  hasAnomaly: el.hasAnomaly,
  anomalyReason: el.anomalyReason
}));
```

Teach: Format dates, extract needed fields

---

### Part 5: Thresholds (10 min)

**Whiteboard Diagram:**
```
50│
40│ ███ ███ ███     ███ ███ ███
30├─────────────────────────────  ← Average
20│                 (40% line)
10│         ██
0 └─────────────────────────────
         Anomaly
```

**Sensitivity Table:**

| Threshold | Catches | Use Case |
|-----------|---------|----------|
| 20-30% | Small deviations | Critical systems |
| 40-50% | Significant issues | **Recommended** |
| 60%+ | Major failures | Reduce false alarms |

**Discuss:**
- Trade-offs
- False positives vs false negatives
- Domain context

---

## Student Exercises

### Exercise 1: Manual Calculation

**Data:** `[28, 30, 29, 12, 31, 28, 30]`

Calculate:
1. Average (26.9 kWh)
2. Day 4 deviation (55.4%)
3. Is it anomaly at 40%? (Yes)
4. Still anomaly at 60%? (Yes)

---

### Exercise 2: Threshold Testing

Test with live dashboard:
- Try 20%, 40%, 60%
- Count anomalies at each
- Create comparison table
- Analyze which is best

---

### Exercise 3: Method Comparison

Compare 2 methods:
1. Window Average
2. Absolute Threshold

Note differences, discuss trade-offs.

---

### Exercise 4: Code Reading

Answer:
1. What does `.reduce()` do? (Line 28)
2. Why multiply by 100? (Line 36)
3. What if deviation is negative? (Line 39)
4. Why `.toFixed(1)`? (Line 46)

---

### Exercise 5: Real Data Analysis

From console logs:
- Find anomalies
- Analyze each one
- Determine if real failure or false positive
- Suggest technician action

---

### Exercise 6: Algorithm Enhancement

**Challenge:** Detect suspiciously HIGH values

Modify to flag days 50%+ above average:

```javascript
const isTooHigh = deviationPercent < -50;
const isAnomaly = deviationPercent > threshold || isTooHigh;
```

Test with: `[30, 32, 31, 95, 29, 31, 30]`

---

## Real-World Scenarios

### Scenario 1: Panel Failure
`[35, 34, 0, 0, 0, 33, 34]`
- Days 3-5 flagged
- 100% below average
- **Action**: Immediate repair

### Scenario 2: Gradual Decline
`[40, 38, 35, 32, 28, 25, 22]`
- Later days flagged
- Trend visible
- **Action**: Schedule maintenance

### Scenario 3: Single Bad Day
`[35, 34, 36, 12, 35, 34, 33]`
- Day 4 only
- Recovers quickly
- **Action**: Monitor, possibly ignore

### Scenario 4: Weather Variation
`[38, 22, 15, 26, 37, 19, 36]`
- Multiple flagged
- Could be cloudy weather
- **Action**: Check weather data

---

## Extensions

### 30-Day Window
Change `limit: 7` to `limit: 30` for longer window

### Weather API Integration
Fetch weather, adjust thresholds on rainy days

### Alert System
Email/SMS when anomalies detected

### Machine Learning
Train model on historical data

---

## Assessment

### Quiz (10 Questions)

1. What is an anomaly?
2. Calculate avg: [20, 25, 22, 23, 24, 21, 22]
3. If avg=30, today=15, what is deviation%?
4. T/F: 35% below avg flagged at 40%
5. Why use % vs absolute?
6. Name one limitation
7. What does negative deviation mean?
8. Which threshold for only major failures?
9. Give 3 causes of anomalies
10. How would weather data help?

### Lab Report

1. Introduction - What & why
2. Methodology - Algorithm explanation
3. Results - Analyze your data
4. Discussion - Evaluate effectiveness
5. Conclusion - Recommendations

### Projects

**Beginner:**
- Excel calculator
- Email template
- Visualization

**Intermediate:**
- 30-day window
- History dashboard
- Chart integration

**Advanced:**
- Weather API
- ML anomaly detection
- Mobile app
- Multi-unit comparison

---

## Quick Reference

### Formulas
```javascript
average = sum(days) / count
deviation% = ((avg - today) / avg) × 100
if (deviation% > threshold) → ANOMALY
```

### Defaults
- Method: Window Average
- Threshold: 40%
- Absolute Min: 5 kWh
- Window: 7 days

### Files
- Algorithm: `src/lib/anomalyDetection.js`
- Component: `src/pages/dashboard/components/DataCard.jsx`
- State: `src/lib/redux/features/uiSlice.js`

---

## FAQ

### Q: Why in Dashboard not Home?
**A:** Dashboard is user-specific (authenticated). Each user sees their own solar unit data.

### Q: What if no solar unit?
**A:** Component returns `null` if no data.

### Q: Can test with fake data?
**A:** Yes! Import from `sampleAnomalyData.js`

### Q: How to change to 30 days?
**A:** Modify `limit: 30` in API query

---

## Teaching Tips

### Make It Visual
- Draw bar charts on whiteboard
- Use colored markers (green/red)
- Show threshold lines

### Real-World Stories
- Solar farm examples
- Cost of downtime
- Early detection saves money

### Encourage Experimentation
- Safe playground
- Instant feedback
- Console logs for debugging

---

## Summary

### Learning Objectives ✓
1. Window-based detection
2. Manual calculations
3. JavaScript implementation
4. React integration
5. Threshold evaluation
6. Real-world application

### Key Takeaways
- Context matters (percentages adapt)
- Trade-offs inevitable (sensitivity vs accuracy)
- Simple can be effective
- Clear explanations build trust

---

**Happy Teaching! 🌞📊**
