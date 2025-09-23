import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Img,
} from "@react-email/components";


// Dummy data for preview
const PREVIEW_DATA = {
  monthlyReport: {
    userName: "John Doe",
    type: "monthly-report",
    data: {
      month: "December",
      stats: {
        totalIncome: 5000,
        totalExpenses: 3500,
        byCategory: {
          housing: 1500,
          groceries: 600,
          transportation: 400,
          entertainment: 300,
          utilities: 700,
        },
      },
      insights: [
        "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
        "Great job keeping entertainment expenses under control this month!",
        "Setting up automatic savings could help you save 20% more of your income.",
      ],
    },
  },
  budgetAlert: {
    userName: "John Doe",
    type: "budget-alert",
    data: {
      percentageUsed: 85,
      budgetAmount: 4000,
      totalExpenses: 3400,
    },
  },
};

export default function Email({
   userName = "",
  type = "monthly-report",
  data = {},
}) {

  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here&rsquo;s your financial summary for {data?.month}:
            </Text>

            {/* Main Stats */}
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Income</Text>
                <Text style={styles.heading}>${data?.stats.totalIncome.toFixed(2)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Expenses</Text>
                <Text style={styles.heading}>${data?.stats.totalExpenses.toFixed(2)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Net</Text>
                <Text style={styles.heading}>
                  ${ (data?.stats.totalIncome - data?.stats.totalExpenses).toFixed(2)}
                </Text>
              </div>
            </Section>

            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Expenses by Category</Heading>
                {Object.entries(data?.stats.byCategory).map(
                  ([category, amount]) => (
                    <div key={category} style={styles.row}>
                      <Text style={styles.text}>{category}</Text>
                      <Text style={styles.text}>${amount.toFixed(2)}</Text>
                    </div>
                  )
                )}
              </Section>
            )}

            {/* AI Insights */}
            {data?.insights && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Wealth Insights</Heading>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using Wealth. Keep tracking your finances for better
              financial health!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
    
    if (type === "budget-alert"){
          return (
    <Html>
      <Head />
      <Preview>Budget Alert</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>

          <Heading style={styles.title}>Budget Alert</Heading>
          <Text style={styles.text}>Hello {userName},</Text>
          <Text style={styles.text}>
            You’ve used <strong>{data.percentageUsed.toFixed(1)}%</strong> of your monthly budget.
          </Text>

          <Section style={styles.statsContainer}>
            <div style={styles.stat}>
              <Text style={styles.statLabel }> Budget Amount</Text>
              <Text style={styles.statValue }>${ data.budgetAmount}</Text>
            </div>
            <div style={styles.stat}>
              <Text style={styles.statLabel }> Spent So Far</Text>
              <Text style={styles.statValue }> ${data.totalExpenses}</Text>
            </div>
            <div style={styles.stat}>
              <Text style={styles.statLabel }> Remaining</Text>
              <Text style={styles.statValue }>
                ${data.budgetAmount - data.totalExpenses}
              </Text>
            </div>
          </Section>

          <Text style={styles.footer}>
            You are receiving this email because you are subscribed to our service.  
            © 2025 Your Company. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
    }

const styles = {
  body: {
    backgroundColor: "#0a0a0f", // almost black background
    fontFamily: "'Inter', -apple-system, sans-serif",
    lineHeight: 1.6,
    color: "#e5e7eb", // light gray text
    margin: 0,
    padding: 0,
  },
  container: {
    backgroundColor: "rgba(20,20,30,0.9)", // dark glass
    backdropFilter: "blur(14px)", // frosted effect
    maxWidth: "600px",
    margin: "40px auto",
    padding: "32px",
    borderRadius: "20px",
    boxShadow: "0 20px 45px rgba(0, 0, 0, 0.75)",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  title: {
    color: "#a855f7", // neon purple
    fontSize: "38px",
    fontWeight: "800",
    textAlign: "center",
    margin: "0 0 28px",
    letterSpacing: "1.2px",
    textShadow: "0 0 12px rgba(168,85,247,0.6)", // glow effect
  },
  heading: {
    color: "#f9fafb",
    fontSize: "22px",
    fontWeight: "600",
    margin: "0 0 14px",
  },
  text: {
    color: "#d1d5db",
    fontSize: "16px",
    margin: "0 0 18px",
  },
  statsContainer: {
    margin: "32px 0",
    padding: "24px",
    background: "linear-gradient(145deg, #1a1a2e, #11111a)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "inset 0 0 15px rgba(138,43,226,0.2)",
  },
  stat: {
    marginBottom: "18px",
    padding: "16px 20px",
    background: "linear-gradient(135deg, #181826, #0f0f17)",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.7), 0 0 10px rgba(236,72,153,0.3)", // pink glow
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },

  statHover: {
    transform: "translateY(-5px) scale(1.02)",
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.8), 0 0 18px rgba(236,72,153,0.5)", // stronger glow
  },
  statLabel: {
    color: "#9ca3af",
    fontSize: "14px",
    fontWeight: "500",
  },
  statValue: {
    color: "#fdf4ff", // very light pink-white
    fontSize: "20px",
    fontWeight: "700",
    textShadow: "0 0 6px rgba(236,72,153,0.6)", // neon text glow
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "36px",
    paddingTop: "18px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
   section: {
  margin: "28px 0",
  padding: "20px",
  background: "linear-gradient(145deg, #141420, #0d0d15)", // dark gradient
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.05)", // subtle glass border
  boxShadow: "inset 0 0 12px rgba(168,85,247,0.2)", // soft purple glow
},
 row: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  marginBottom: "10px",
  background: "rgba(255,255,255,0.02)",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.05)",
},
};












// userName = PREVIEW_DATA.monthlyReport.userName,
//   type = PREVIEW_DATA.monthlyReport.type,
//     data = { // Set default values for the properties inside the data object
//     month: PREVIEW_DATA.monthlyReport.data.month,
//     stats: PREVIEW_DATA.monthlyReport.data.stats,
//     insights: PREVIEW_DATA.monthlyReport.data.insights,