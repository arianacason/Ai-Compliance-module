# Module 5 Bug Fix - Question Format Corrections

## 🐛 Issues Fixed

Two questions in the diagnostic checklist were not formatted as yes/no questions, making them confusing for users who needed to answer with "Yes" or "No" buttons.

## ✅ Changes Made

### Question 7: Error Handling

**Before (Incorrect):**
```
Question: "What happens when the AI system encounters data it can't process?"
Risk Level: MEDIUM RISK
Buttons: Yes | No
```

**After (Fixed):**
```
Question: "Does the system have clear error handling when it encounters data it can't process?"
Risk Level: MEDIUM RISK
Buttons: Yes | No
```

**Why this matters:** The original question was open-ended ("What happens...") which cannot be answered with Yes/No. The fixed version asks a closed question that can be answered definitively.

---

### Question 10: Access Controls

**Before (Incorrect):**
```
Question: "Who has access to the AI system and its data?"
Risk Level: MEDIUM RISK
Buttons: Yes | No
```

**After (Fixed):**
```
Question: "Is access to the AI system and its data properly controlled and documented?"
Risk Level: MEDIUM RISK
Buttons: Yes | No
```

**Why this matters:** The original question asked "Who" (seeking a list of people) which cannot be answered with Yes/No. The fixed version asks whether access is properly controlled, which is a yes/no question.

---

## 📋 Technical Details

**File Modified:** `components/course/modules/Module5.tsx`

**Lines Changed:** 2 question strings

**Impact:** 
- Improved user experience in the diagnostic checklist
- Questions now align with the Yes/No answer format
- Maintains the same risk assessment logic and guidance

---

## 🧪 Testing

To verify the fixes:

1. Navigate to Module 5: "Spotting the Red Flags"
2. Scroll to the "AI System Diagnostic Checklist"
3. Find Question 7 (error handling)
4. **Verify:** Question reads "Does the system have clear error handling..."
5. **Verify:** Yes/No buttons make sense for this question
6. Find Question 10 (access controls)
7. **Verify:** Question reads "Is access to the AI system..."
8. **Verify:** Yes/No buttons make sense for this question

---

## ✨ Result

All 15 checklist questions are now properly formatted as yes/no questions, providing a consistent and intuitive user experience throughout the diagnostic checklist.