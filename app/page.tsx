import Link from "next/link";

export default function Home() {
  const features = [
    {
      number: "01",
      title: "Think",
      description:
        "Understand the user's objective and define the required workflow.",
    },
    {
      number: "02",
      title: "Plan",
      description:
        "Break complex goals into clear, structured tasks.",
    },
    {
      number: "03",
      title: "Act",
      description:
        "Coordinate specialized agents and review the final result.",
    },
  ];

  const agents = [
    "Orchestrator",
    "Planner",
    "Knowledge",
    "Executor",
    "Reviewer",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "0 7vw 40px",
        background: "#06070b",
        color: "#f5f7ff",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "11px",
              background:
                "linear-gradient(135deg,#8b9cff,#a78bfa)",
              color: "white",
              fontSize: "12px",
              fontWeight: 800,
            }}
          >
            CX
          </div>

          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              CODEX AI
            </div>

            <div
              style={{
                marginTop: "3px",
                color: "#626a7d",
                fontSize: "10px",
              }}
            >
              Think. Plan. Act.
            </div>
          </div>
        </div>

        <Link
          href="/dashboard"
          style={{
            padding: "10px 15px",
            border: "1px solid #293148",
            borderRadius: "10px",
            color: "#cdd2e1",
            textDecoration: "none",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          Open Dashboard →
        </Link>
      </nav>

      {/* HERO */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "130px auto 0",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 11px",
            border: "1px solid #202638",
            borderRadius: "999px",
            color: "#858b9c",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.13em",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#8b9cff",
            }}
          />

          AGENTIC AI WORKFLOW PLATFORM
        </div>

        <h1
          style={{
            margin: "28px 0 0",
            fontSize: "clamp(58px,10vw,120px)",
            lineHeight: 0.9,
            letterSpacing: "-0.065em",
          }}
        >
          From a goal
          <br />
          to{" "}
          <span style={{ color: "#9ba8ff" }}>
            action.
          </span>
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "30px auto 0",
            color: "#858b9c",
            fontSize: "17px",
            lineHeight: 1.7,
          }}
        >
          CODEX AI transforms complex goals into structured
          plans, coordinated agent workflows, and validated
          results.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            marginTop: "35px",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              padding: "14px 20px",
              border:
                "1px solid rgba(139,156,255,0.45)",
              borderRadius: "11px",
              background:
                "linear-gradient(135deg,#20294c,#151a2d)",
              color: "white",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            Start a Workflow →
          </Link>

          <a
            href="#how-it-works"
            style={{
              color: "#858b9c",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            Explore the system
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="how-it-works"
        style={{
          maxWidth: "1050px",
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          margin: "150px auto 0",
          borderTop: "1px solid #202638",
          borderBottom: "1px solid #202638",
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.number}
            style={{
              padding: "30px",
              borderRight: "1px solid #202638",
            }}
          >
            <strong
              style={{
                color: "#626a7d",
                fontSize: "10px",
              }}
            >
              {feature.number}
            </strong>

            <h3
              style={{
                margin: "20px 0 8px",
                fontSize: "19px",
              }}
            >
              {feature.title}
            </h3>

            <p
              style={{
                margin: 0,
                color: "#70788d",
                fontSize: "12px",
                lineHeight: 1.6,
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* ARCHITECTURE */}
      <section
        style={{
          maxWidth: "1050px",
          margin: "130px auto 0",
        }}
      >
        <div
          style={{
            color: "#8b9cff",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.15em",
          }}
        >
          MULTI-AGENT ARCHITECTURE
        </div>

        <h2
          style={{
            marginTop: "15px",
            fontSize: "clamp(35px,5vw,58px)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          One goal.
          <br />
          Multiple specialized agents.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(5, minmax(0, 1fr))",
            gap: "10px",
            marginTop: "45px",
          }}
        >
          {agents.map((agent, index) => (
            <div
              key={agent}
              style={{
                minHeight: "130px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "17px",
                border: "1px solid #202638",
                borderRadius: "14px",
                background: "#0b0e16",
              }}
            >
              <span
                style={{
                  color: "#626a7d",
                  fontSize: "10px",
                }}
              >
                0{index + 1}
              </span>

              <strong style={{ fontSize: "13px" }}>
                {agent}
              </strong>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          maxWidth: "1050px",
          display: "flex",
          justifyContent: "space-between",
          margin: "100px auto 0",
          paddingTop: "20px",
          borderTop: "1px solid #202638",
          color: "#50586c",
          fontSize: "10px",
        }}
      >
        <span>CODEX AI</span>
        <span>Think. Plan. Act.</span>
        <span>Team Code X</span>
      </footer>
    </main>
  );
}