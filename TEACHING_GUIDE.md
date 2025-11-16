# 🌞 Anomaly Detection for Solar Panels
## Presentation Deck

**Full-Stack Development Course - Data Analysis Module**

---

## 📋 Slide 1: Course Overview

### Lesson: Window-Based Anomaly Detection
**Real solar panel data | User dashboard | Live analysis**

**⏱️ Duration:** 60-90 minutes

**🎯 Learning Outcomes:**
- ✓ Window-based statistical analysis
- ✓ React state management
- ✓ API integration with RTK Query
- ✓ Real-time threshold tuning
- ✓ Data visualization

---

## 🏗️ Slide 2: Application Architecture

### User Flow Pipeline
```
┌─────────────────┐
│  1. Sign In     │  Clerk Authentication
└────────┬────────┘
         ↓
┌─────────────────┐
│  2. Dashboard   │  Navigate to /dashboard
└────────┬────────┘
         ↓
┌─────────────────┐
│  3. Fetch ID    │  Get user's solar unit
└────────┬────────┘
         ↓
┌─────────────────┐
│  4. Get Data    │  7 days of energy records
└────────┬────────┘
         ↓
┌─────────────────┐
│  5. Analyze     │  Run anomaly detection
└────────┬────────┘
         ↓
┌─────────────────┐
│  6. Display     │  Interactive results
└─────────────────┘
```

---

## 📁 Slide 3: Project File Structure

### Core Algorithm
- 🧮 `anomalyDetection.js` - Detection logic
- 📊 `sampleAnomalyData.js` - Test scenarios

### React Components
- 🎴 `DataCard.jsx` - Main card + controls
- 📈 `EnergyProductionCard.jsx` - Individual day
- 📊 `EnergyProductionCards.jsx` - Card grid
- 🔖 `EnergyTab.jsx` - All/Anomaly filters

### State Management
- 🔄 `uiSlice.js` - UI state
- 🌐 `query.js` - API fetching (RTK Query)

---

## 💡 Slide 4: The Problem

### Challenge: Detecting Solar Panel Failures

**Question:** How do we automatically identify "bad days"?

```
Day 1: ████████████████  35 kWh ✓
Day 2: ███████████████   34 kWh ✓
Day 3: █████████████     30 kWh ✓
Day 4: ████              8 kWh  ⚠️ Problem?
Day 5: ███████████████   33 kWh ✓
Day 6: ████████████████  35 kWh ✓
Day 7: ███████████████   34 kWh ✓
```

**Need:** Automatic detection system

---

## ✨ Slide 5: The Solution

### Window-Based Detection

**Core Idea:** Compare each day against the 7-day average

### The Rule
```
IF day is 40%+ below weekly average
THEN flag as ANOMALY
```

### Why This Works
- ✅ **Adaptive** - Adjusts to seasons (winter/summer)
- ✅ **Simple** - Basic math (averaging, percentages)
- ✅ **Contextual** - Compares to recent performance
- ✅ **Intuitive** - Easy to explain to non-technical users

---

## 🧮 Slide 6: The Algorithm

### Three Simple Steps

```javascript
┌───────────────────────────────────────────┐
│ STEP 1: Calculate Window Average         │
│ average = sum(all 7 days) / 7             │
└───────────────────────────────────────────┘
              ↓
┌───────────────────────────────────────────┐
│ STEP 2: Calculate Deviation              │
│ deviation% = (avg - today)/avg × 100      │
└───────────────────────────────────────────┘
              ↓
┌───────────────────────────────────────────┐
│ STEP 3: Check Threshold                  │
│ if (deviation% > 40%) → ANOMALY           │
└───────────────────────────────────────────┘
```

---

## 📊 Slide 7: Worked Example

### Sample Data
```
Mon: 35 kWh  ✓
Tue: 34 kWh  ✓
Wed: 36 kWh  ✓
Thu: 18 kWh  ⚠️ ← Checking this day
Fri: 33 kWh  ✓
Sat: 35 kWh  ✓
Sun: 34 kWh  ✓
```

### Step-by-Step Calculation

**Step 1:** Calculate Average
```
(35 + 34 + 36 + 18 + 33 + 35 + 34) / 7 = 32.1 kWh
```

**Step 2:** Calculate Thursday's Deviation
```
(32.1 - 18) / 32.1 × 100 = 43.9%
```

**Step 3:** Compare to Threshold
```
43.9% > 40% ✓ → ANOMALY DETECTED!
```

---

## 🚀 Slide 8: Getting Started

### Launch the Application

**Step 1:** Start Development Server
```bash
npm run dev
```

**Step 2:** Sign In
- Navigate to `http://localhost:5173`
- Use test user credentials
- ⚠️ User must have solar unit assigned

**Step 3:** Access Dashboard
- Click **"Dashboard"** in navigation
- Locate **"Solar Energy Production"** card
- Open **Console** (F12) for debug logs

> 💡 **Tip:** Keep console open to see live calculations!

---

## 🖥️ Slide 9: Dashboard UI Components

### Header Section
```
┌────────────────────────────────────────────┐
│  Solar Energy Production                  │
│  Daily energy output for the past 7 days  │
└────────────────────────────────────────────┘
```

### Interactive Controls
1. 🔽 **Detection Method Dropdown**
   - Window Average (7-day) *[Default]*
   - Absolute Threshold

2. 🎚️ **Threshold Slider** (20-60%, default 40%)

3. 🎚️ **Absolute Min Slider** (1-15 kWh, default 5 kWh)

---

## 📈 Slide 10: Dashboard Features

### Stats Banner (Blue Box)
```
┌──────────────────────────────────────────┐
│  📊 Window Average: 32.1 kWh             │
│  📏 Range: 18 - 36 kWh                   │
│  ⚠️  Anomalies: 2                         │
└──────────────────────────────────────────┘
```
*Anomaly count: 🟢 Green = 0 | 🔴 Red > 0*

### Tab Filters
- **All** - Show all 7 days
- **Anomaly** - Show only flagged days

### Energy Cards
| Type | Border | Text | Badge |
|------|--------|------|-------|
| Normal | Gray | Blue | None |
| Anomaly | Red | Red | "Anomaly" |

> 💡 **Click any card** → See detailed explanation

---

## 🎓 TEACHING SEQUENCE

---

## 📝 Slide 11: Part 1 - Introduction (10 min)

### Opening Discussion

**Ask Students:**
> "How would you detect problems in solar panel data?"

### Whiteboard: Define Anomaly
```
╔════════════════════════════════════════╗
║  What is an Anomaly?                   ║
║  • Unusual data point                  ║
║  • Deviates from normal pattern        ║
║  • Indicates potential problem         ║
╚════════════════════════════════════════╝

Examples in Solar Data:
✗ Zero production → Complete failure
✗ Very low output → Shading/dirt/damage
✗ Unusual pattern → Sensor error
```

### Live Demo
1. ✓ Sign in to application
2. ✓ Navigate to Dashboard
3. ✓ Point out energy cards
4. ✓ Click anomaly card → Show tooltip

---

## 🧮 Slide 12: Part 2 - Manual Calculation (20 min)

### Whiteboard Exercise

**Given Data:** `[30, 32, 31, 15, 29, 31, 30]` kWh
**Threshold:** 40%

```
┌─────────────────────────────────────────┐
│  Step 1: Calculate Sum                  │
│  30+32+31+15+29+31+30 = 198 kWh         │
├─────────────────────────────────────────┤
│  Step 2: Calculate Average              │
│  198 / 7 = 28.3 kWh                     │
├─────────────────────────────────────────┤
│  Step 3: Calculate Day 4 Deviation      │
│  (28.3 - 15) / 28.3 × 100 = 47%         │
├─────────────────────────────────────────┤
│  Step 4: Check Threshold                │
│  47% > 40% ✓ → ANOMALY!                 │
└─────────────────────────────────────────┘
```

---

## ✏️ Slide 13: Student Practice Exercise

### Challenge: Analyze This Data
**Given:** `[25, 27, 26, 24, 8, 26, 25]` kWh

**Students Calculate:**

1. **Average** = ?
   <details><summary>Answer</summary>23 kWh</details>

2. **Day 5 Deviation** = ?
   <details><summary>Answer</summary>65.2%</details>

3. **Is it an anomaly?** (threshold 40%)
   <details><summary>Answer</summary>YES - 65.2% > 40%</details>

> ⏱️ **Time:** 5-7 minutes | **Debrief:** Show work on board

---

## 💻 Slide 14: Part 3 - Live UI Demo (15 min)

### Demo 1: Detection Methods

**Show Both Methods:**
- 🔷 **Window Average** - Compares to 7-day avg *(Default)*
- 🔶 **Absolute Threshold** - Fixed minimum (< 5 kWh)

> 🎬 **Action:** Switch between methods, show different results

---

## 🎚️ Slide 15: Demo 2 - Threshold Sensitivity

### Experiment with Different Thresholds

| Threshold | Sensitivity | Results | Question for Class |
|-----------|-------------|---------|-------------------|
| **20%** | Very High | More anomalies | *"Too many false alarms?"* |
| **40%** | Balanced ⭐ | Significant issues only | *"Just right?"* |
| **60%** | Low | Only major failures | *"Might miss problems?"* |

> 🎬 **Action:** Adjust slider, observe changes in real-time

---

## 🔖 Slide 16: Demo 3 - Tab Filtering

### All vs Anomaly Tabs

**All Tab** 🗂️
- Shows all 7 days
- Anomalies marked in red
- Full context view

**Anomaly Tab** ⚠️
- Filtered view - flagged days only
- Technician's quick-scan view
- Focus on problems

> 🎬 **Action:** Toggle between tabs

---

## 🖱️ Slide 17: Demo 4 - Card Interaction

### Interactive Tooltips

**Click any anomaly card:**
```
┌─────────────────────────────────┐
│  Why is this an anomaly?        │
│                                 │
│  43.9% below window average     │
│                                 │
│  Expected: ~32 kWh              │
│  Actual: 18 kWh                 │
└─────────────────────────────────┘
```

Shows detailed explanation with exact percentages

---

## 🔍 Slide 18: Demo 5 - Console Logs

### Developer View (F12 Console)

```javascript
Anomaly Detection Stats: {
  windowAverage: "32.1",
  anomalyCount: 2,
  anomalyRate: "28.6%"
}

Data with Anomalies: [{
  totalEnergy: 18,
  hasAnomaly: true,
  deviationPercent: "43.9",
  anomalyReason: "43.9% below window average"
}]
```

### Key Points to Highlight
- ➕ **Positive deviation** = Below average (⚠️ bad)
- ➖ **Negative deviation** = Above average (✅ good)
- 🔺 **Large positive** = Anomaly

---

## 👨‍💻 Slide 19: Part 4 - Code Walkthrough (25 min)

### File 1: Detection Algorithm
📂 **Open:** `src/lib/anomalyDetection.js`

---

## 📝 Slide 20: Code - Calculate Average

### Lines 27-29: Sum All Energy Values

```javascript
const totalEnergy = records.reduce((sum, record) =>
  sum + record.totalEnergy, 0
);
const averageEnergy = totalEnergy / records.length;
```

### Teaching Points
- ✨ `.reduce()` accumulates all values
- Starts at `0`, adds each `record.totalEnergy`
- Divides total by count for average

---

## 📝 Slide 21: Code - Check Each Day

### Lines 32-39: Calculate Deviation & Flag Anomalies

```javascript
const deviationPercent =
  ((averageEnergy - energy) / averageEnergy) * 100;

const isAnomaly = deviationPercent > thresholdPercent;
```

### Teaching Points
- 🧮 **Formula:** `(avg - actual) / avg × 100`
- ➕ **Positive** = Below average (problem!)
- ➖ **Negative** = Above average (good)
- ✅ **Compare** to threshold (e.g., 40%)

---

## 📝 Slide 22: Code - Return Enhanced Data

### Lines 41-52: Add Anomaly Information

```javascript
return {
  ...record,                              // Keep original data
  hasAnomaly: isAnomaly,                  // Boolean flag
  anomalyReason: isAnomaly
    ? `${deviation}% below average`
    : null,
  windowAverage: averageEnergy.toFixed(1),
  deviationPercent: deviationPercent.toFixed(1)
};
```

### Teaching Points
- 📦 **Spread operator** (`...record`) preserves original
- 🏷️ Add new properties for UI
- 🔢 `.toFixed(1)` rounds to 1 decimal

---

## 📝 Slide 23: Code - Dashboard Component

### File 2: React Component
📂 **Open:** `src/pages/dashboard/components/DataCard.jsx`

---

## 📝 Slide 24: Code - React State

### Lines 10-17: Component State Management

```javascript
const [detectionMethod, setDetectionMethod] =
  useState('windowAverage');

const [thresholdPercent, setThresholdPercent] =
  useState(40);

const [absoluteMin, setAbsoluteMin] =
  useState(5);
```

### Teaching Points
- 🎣 **React Hooks** (`useState`) for UI controls
- 🔄 Each state variable controls UI element
- 🔢 Default values match our recommendations

---

## 📝 Slide 25: Code - API Data Fetching

### Lines 27-30: RTK Query Hook

```javascript
const { data } = useGetEnergyGenerationRecordsBySolarUnitQuery({
  id: solarUnitId,
  groupBy: "date",
  limit: 7              // 7-day window
});
```

### Teaching Points
- 🌐 **RTK Query** - Modern data fetching
- 🔄 Automatic caching & refetching
- 📊 Groups by date, limits to 7 days

---

## 📝 Slide 26: Code - Run Detection

### Lines 61-66: Call Algorithm

```javascript
const dataWithAnomalies = detectAnomalies(
  last7Days,
  detectionMethod,
  {
    windowThresholdPercent: thresholdPercent,
    absoluteThreshold: absoluteMin
  }
);
```

### Teaching Points
- 🔌 Connect UI state to algorithm
- 📤 Pass user-selected settings
- 📥 Receive enhanced data with flags

---

## 📝 Slide 27: Code - Transform for UI

### Lines 68-77: Format Data for Display

```javascript
const energyProductionData = dataWithAnomalies.map((el) => ({
  day: format(toDate(el._id.date), "EEE"),  // "Mon"
  production: el.totalEnergy,
  hasAnomaly: el.hasAnomaly,
  anomalyReason: el.anomalyReason
}));
```

### Teaching Points
- 🗓️ **Date formatting** - MongoDB date → "Mon", "Tue"
- 🎨 Extract only fields needed by UI
- 📋 `.map()` transforms array

---

## 🎯 Slide 28: Part 5 - Understanding Thresholds (10 min)

### Whiteboard: Visual Representation

```
 kWh
  50│
  40│ ███ ███ ███     ███ ███ ███
  30├─────────────────────────────  ← Average Line
  20│                 (40% below here = anomaly)
  10│         ██
   0└─────────────────────────────
           Anomaly!
```

**Key Insight:** The threshold determines sensitivity

---

## ⚖️ Slide 29: Threshold Sensitivity Analysis

### Choosing the Right Threshold

| Threshold | Sensitivity | Catches | Best For |
|-----------|-------------|---------|----------|
| **20-30%** | High ⬆️ | Small deviations | Critical systems |
| **40-50%** | Balanced ⭐ | Significant issues | **Recommended** |
| **60%+** | Low ⬇️ | Major failures only | Reduce false alarms |

### Discussion Points
1. ⚔️ **Trade-offs** - Sensitivity vs Accuracy
2. 🔴 **False Positives** - Flagging normal variation
3. 🔵 **False Negatives** - Missing real problems
4. 🏭 **Domain Context** - Solar panels vs other systems

---

## 🎯 STUDENT EXERCISES

---

## ✏️ Slide 30: Exercise 1 - Manual Calculation

### Practice the Math

**Given Data:** `[28, 30, 29, 12, 31, 28, 30]` kWh

**Tasks:**
1. Calculate average
2. Calculate Day 4 deviation
3. Is it anomaly at 40%?
4. Is it still anomaly at 60%?

<details>
<summary><strong>Answers</strong></summary>

1. Average = 26.9 kWh
2. Day 4 deviation = 55.4%
3. At 40%: YES (55.4% > 40%)
4. At 60%: NO (55.4% < 60%)
</details>

---

## 🧪 Slide 31: Exercise 2 - Threshold Testing

### Live Dashboard Experiment

**Instructions:**
1. Adjust threshold slider: 20%, 40%, 60%
2. Count anomalies at each level
3. Create comparison table
4. Analyze which is most appropriate

**Deliverable:** Findings report

| Threshold | Anomaly Count | Assessment |
|-----------|---------------|------------|
| 20% | ? | Too sensitive? |
| 40% | ? | Just right? |
| 60% | ? | Missing issues? |

---

## 🔬 Slide 32: Exercise 3 - Method Comparison

### Compare Detection Approaches

**Test Both Methods:**
1. 🔷 Window Average
2. 🔶 Absolute Threshold

**Analysis Tasks:**
- Note which days are flagged differently
- Discuss pros/cons of each
- When would you use each method?

**Deliverable:** Comparison writeup

---

## 📖 Slide 33: Exercise 4 - Code Reading

### Answer These Questions

**From `anomalyDetection.js`:**

1. What does `.reduce()` do? *(Line 28)*
2. Why multiply by 100? *(Line 36)*
3. What if deviation is negative? *(Line 39)*
4. Why use `.toFixed(1)`? *(Line 46)*

<details>
<summary><strong>Answers</strong></summary>

1. Sums all energy values
2. Converts to percentage
3. Above average (good performance)
4. Rounds to 1 decimal place
</details>

---

## 🔍 Slide 34: Exercise 5 - Real Data Analysis

### Forensic Analysis

**Using Console Logs (F12):**

**Tasks:**
1. Identify all anomalies
2. Analyze each flagged day
3. Determine: Real failure or false positive?
4. Suggest technician action

**Example Analysis:**
```
Day 4: 8 kWh (65% below avg)
→ Likely real failure
→ Action: Immediate inspection
```

---

## 🚀 Slide 35: Exercise 6 - Algorithm Enhancement

### Challenge: Detect Suspiciously HIGH Values

**Problem:** Panel might be misreporting (sensor error)

**Modify Code:**
```javascript
const isTooHigh = deviationPercent < -50;
const isAnomaly =
  deviationPercent > threshold || isTooHigh;
```

**Test Data:** `[30, 32, 31, 95, 29, 31, 30]`

**Expected:** Day 4 flagged as anomaly (95 kWh too high)

> **Advanced:** Add different reason messages for each type

---

## 🌍 REAL-WORLD SCENARIOS

---

## ⚠️ Slide 36: Scenario 1 - Complete Panel Failure

### Data Pattern
`[35, 34, 0, 0, 0, 33, 34]`

```
Day 1: ████████████████  35 kWh ✓
Day 2: ███████████████   34 kWh ✓
Day 3: ░░░░░░░░░░░░░░░    0 kWh 🔴
Day 4: ░░░░░░░░░░░░░░░    0 kWh 🔴
Day 5: ░░░░░░░░░░░░░░░    0 kWh 🔴
Day 6: ████████████████  33 kWh ✓
Day 7: ████████████████  34 kWh ✓
```

**Analysis:** Days 3-5 flagged (100% below average)
**Diagnosis:** Complete system failure
**Action:** 🚨 **Immediate repair required**

---

## 📉 Slide 37: Scenario 2 - Gradual Decline

### Data Pattern
`[40, 38, 35, 32, 28, 25, 22]`

```
Day 1: ████████████████████  40 kWh ✓
Day 2: ███████████████████   38 kWh ✓
Day 3: █████████████████     35 kWh ⚠️
Day 4: ███████████████       32 kWh ⚠️
Day 5: █████████████         28 kWh 🔴
Day 6: ███████████           25 kWh 🔴
Day 7: █████████             22 kWh 🔴
```

**Analysis:** Later days flagged, downward trend
**Diagnosis:** Progressive degradation (dirt accumulation?)
**Action:** 🔧 **Schedule maintenance/cleaning**

---

## ⚡ Slide 38: Scenario 3 - Single Bad Day

### Data Pattern
`[35, 34, 36, 12, 35, 34, 33]`

```
Day 1: ████████████████  35 kWh ✓
Day 2: ███████████████   34 kWh ✓
Day 3: █████████████████ 36 kWh ✓
Day 4: ██████            12 kWh 🔴
Day 5: ████████████████  35 kWh ✓
Day 6: ███████████████   34 kWh ✓
Day 7: ████████████████  33 kWh ✓
```

**Analysis:** Day 4 only, quick recovery
**Diagnosis:** Temporary shading or cloud cover
**Action:** 👁️ **Monitor - likely false positive**

---

## ☁️ Slide 39: Scenario 4 - Weather Variation

### Data Pattern
`[38, 22, 15, 26, 37, 19, 36]`

```
Day 1: ███████████████████  38 kWh ✓
Day 2: ███████████          22 kWh 🔴
Day 3: ███████              15 kWh 🔴
Day 4: ████████████         26 kWh ⚠️
Day 5: ██████████████████   37 kWh ✓
Day 6: █████████            19 kWh 🔴
Day 7: ██████████████████   36 kWh ✓
```

**Analysis:** Multiple flagged, inconsistent pattern
**Diagnosis:** Likely weather-related (cloudy days)
**Action:** ☁️ **Cross-check weather data before action**

---

## 🚀 EXTENSIONS & ENHANCEMENTS

---

## 📅 Slide 40: Extension Ideas

### 1. Longer Window (30 Days)
```javascript
limit: 30  // Change from 7 to 30
```
**Benefit:** Better seasonal baseline

### 2. Weather API Integration
**Concept:** Cross-reference with weather data
```javascript
if (isRainyDay) {
  threshold = 60%; // Be less sensitive
}
```

### 3. Alert System
**Implementation:**
- Email notifications for anomalies
- SMS for critical failures (3+ days)
- Slack/Teams integration

### 4. Machine Learning
**Advanced:**
- Train on historical data
- Predict expected values
- Detect subtle patterns

---

## 📝 ASSESSMENT

---

## 🎯 Slide 41: Quiz Questions (10)

### Knowledge Check

1. **Define:** What is an anomaly?
2. **Calculate:** Average of `[20, 25, 22, 23, 24, 21, 22]`
3. **Calculate:** If avg=30, today=15, what is deviation%?
4. **T/F:** Is 35% below avg flagged at 40% threshold?
5. **Explain:** Why use percentage vs absolute values?
6. **Identify:** Name one limitation of this approach
7. **Interpret:** What does negative deviation mean?
8. **Apply:** Which threshold for major failures only?
9. **List:** Give 3 causes of solar anomalies
10. **Propose:** How would weather data improve accuracy?

---

## 📄 Slide 42: Lab Report Structure

### Formal Write-Up (Individual/Group)

**1. Introduction** (1 page)
- What is anomaly detection?
- Why is it important for solar panels?

**2. Methodology** (2 pages)
- Explain the algorithm step-by-step
- Include formulas and examples

**3. Results** (1-2 pages)
- Analyze your dashboard data
- Present findings with screenshots

**4. Discussion** (1-2 pages)
- Evaluate effectiveness
- Discuss trade-offs & limitations

**5. Conclusion** (1 page)
- Recommendations for threshold
- Suggestions for improvements

---

## 🏆 Slide 43: Student Projects

### Project Tiers

**🟢 Beginner Level**
- Excel calculator for anomaly detection
- Email alert template design
- Data visualization in charts

**🟡 Intermediate Level**
- Implement 30-day window
- Build historical dashboard
- Integrate charting library (D3/Chart.js)

**🔴 Advanced Level**
- Weather API integration
- ML-based anomaly detection
- Mobile app version
- Multi-unit comparison dashboard

> **Timeline:** 1-2 weeks outside class

---

## 📚 QUICK REFERENCE

---

## 🔖 Slide 44: Quick Reference Card

### Core Formulas
```javascript
average = sum(all days) / count
deviation% = ((avg - today) / avg) × 100
if (deviation% > threshold) → ANOMALY
```

### Default Settings
| Setting | Value |
|---------|-------|
| Method | Window Average |
| Threshold | 40% |
| Absolute Min | 5 kWh |
| Window Size | 7 days |

### Key Files
- 🧮 Algorithm: `src/lib/anomalyDetection.js`
- 🎨 Component: `src/pages/dashboard/components/DataCard.jsx`
- 🔄 State: `src/lib/redux/features/uiSlice.js`
- 🌐 API: `src/lib/redux/query.js`

---

## ❓ FREQUENTLY ASKED QUESTIONS

---

## 💬 Slide 45: FAQ

### Common Questions & Answers

**Q: Why is this in Dashboard, not Home page?**
> **A:** Dashboard is user-specific (requires authentication). Each user sees their own solar unit data.

**Q: What happens if user has no solar unit?**
> **A:** Component gracefully returns `null` - no crash, no display.

**Q: Can we test with fake/sample data?**
> **A:** Yes! Import from `sampleAnomalyData.js` for testing scenarios.

**Q: How do we change to 30-day window?**
> **A:** Modify `limit: 30` in the RTK Query API call.

**Q: Why percentage instead of absolute thresholds?**
> **A:** Percentages adapt to context - same threshold works in winter and summer.

---

## 👨‍🏫 TEACHING TIPS

---

## 🎨 Slide 46: Presentation Best Practices

### Make It Visual
- 📊 **Draw bar charts** on whiteboard
- 🎨 **Use colored markers** (green=normal, red=anomaly)
- 📏 **Show threshold lines** visually
- 🖼️ **Screenshots** of dashboard in action

### Tell Real Stories
- 🌾 **Solar farm examples** - Real failures and costs
- 💰 **Cost of downtime** - Why early detection matters
- 📈 **ROI stories** - Money saved by catching issues early
- 🔧 **Technician perspective** - How they use the data

### Encourage Hands-On Learning
- 🎮 **Safe playground** - Can't break anything!
- ⚡ **Instant feedback** - See changes immediately
- 🔍 **Console logs** - Peek under the hood
- 🤔 **"What if?" questions** - Encourage experimentation

---

## 🎓 COURSE SUMMARY

---

## ✅ Slide 47: Learning Objectives Achieved

### What Students Learned
1. ✓ **Window-based detection** - Statistical approach to anomaly detection
2. ✓ **Manual calculations** - Understanding the math behind the code
3. ✓ **JavaScript implementation** - `.reduce()`, `.map()`, formulas
4. ✓ **React integration** - Hooks, state management, RTK Query
5. ✓ **Threshold evaluation** - Balancing sensitivity vs accuracy
6. ✓ **Real-world application** - Practical solar panel monitoring

---

## 💡 Slide 48: Key Takeaways

### Core Lessons

**1. Context Matters**
> Percentages adapt to seasons and locations - more robust than fixed values

**2. Trade-offs are Inevitable**
> Sensitivity vs Accuracy - No perfect threshold, only appropriate ones

**3. Simple Can Be Effective**
> Don't always need complex ML - Basic statistics work well

**4. Clear Explanations Build Trust**
> Users trust systems they understand

---

## 🎯 Slide 49: Final Thoughts

### Remember

```
┌─────────────────────────────────────────┐
│  "The best algorithm is one that:       │
│   • Solves the problem                  │
│   • Can be explained                    │
│   • Can be maintained                   │
│   • Adapts to context"                  │
└─────────────────────────────────────────┘
```

### Next Steps
- ✏️ Complete exercises
- 📝 Submit lab report (if assigned)
- 🚀 Work on projects
- 💬 Ask questions!

---

## 🌞 Thank You!

### Questions?

**Resources:**
- 📂 Code: `src/lib/anomalyDetection.js`
- 📊 Dashboard: `/dashboard`
- 📖 This guide: `TEACHING_GUIDE.md`

**Happy Learning!** 📊✨

---

**End of Presentation**
