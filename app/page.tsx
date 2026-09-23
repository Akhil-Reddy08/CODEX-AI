import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <div className="brand">
          <div className="brand-mark">CX</div>

          <div>
            <div className="brand-name">CODEX AI</div>
            <div className="brand-subtitle">
              Think. Plan. Act.
            </div>
          </div>
        </div>

        <Link href="/dashboard" className="nav-button">
          Open Dashboard →
        </Link>
      </nav>

      <section className="hero">
        <div className="hero-badge">
          <span />
          AGENTIC AI WORKFLOW PLATFORM
        </div>

        <h1>
          From a goal
          <br />
          to <span>action.</span>
        </h1>

        <p>
          CODEX AI transforms complex goals into structured
          plans, coordinated agent workflows, and validated
          results.
        </p>

        <div className="hero-actions">
          <Link href="/dashboard" className="hero-button">
            Start a Workflow
            <span>→</span>
          </Link>

          <a href="#how-it-works" className="learn-button">
            Explore the system
          </a>
        </div>
      </section>

      <section className="feature-strip" id="how-it-works">
        <div>
          <strong>01</strong>
          <h3>Think</h3>
          <p>
            Understand the user's objective and define the
            required workflow.
          </p>
        </div>

        <div>
          <strong>02</strong>
          <h3>Plan</h3>
          <p>
            Break complex goals into clear, structured tasks.
          </p>
        </div>

        <div>
          <strong>03</strong>
          <h3>Act</h3>
          <p>
            Coordinate specialized agents and review the
            final result.
          </p>
        </div>
      </section>

      <section className="architecture-preview">
        <div className="preview-heading">
          <div className="eyebrow">MULTI-AGENT ARCHITECTURE</div>

          <h2>
            One goal.
            <br />
            Multiple specialized agents.
          </h2>
        </div>

        <div className="preview-flow">
          {[
            "Orchestrator",
            "Planner",
            "Knowledge",
            "Executor",
            "Reviewer",
          ].map((agent, index) => (
            <div className="preview-agent" key={agent}>
              <span>0{index + 1}</span>
              <strong>{agent}</strong>
            </div>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <span>CODEX AI</span>
        <span>Think. Plan. Act.</span>
        <span>Team Code X</span>
      </footer>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          padding: 0 7vw 40px;
          background:
            radial-gradient(
              circle at 50% 10%,
              rgba(100, 116, 255, 0.13),
              transparent 30%
            ),
            #06070b;
          color: #f5f7ff;
        }

        .landing-nav {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-mark {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: linear-gradient(
            135deg,
            #8b9cff,
            #a78bfa
          );
          color: white;
          font-size: 12px;
          font-weight: 800;
        }

        .brand-name {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .brand-subtitle {
          margin-top: 3px;
          color: #626a7d;
          font-size: 10px;
        }

        .nav-button {
          padding: 10px 15px;
          border: 1px solid #293148;
          border-radius: 10px;
          color: #cdd2e1;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
        }

        .hero {
          max-width: 1000px;
          margin: 130px auto 0;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 11px;
          border: 1px solid #202638;
          border-radius: 999px;
          background: rgba(13, 16, 25, 0.8);
          color: #858b9c;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.13em;
        }

        .hero-badge span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8b9cff;
          box-shadow: 0 0 10px #8b9cff;
        }

        .hero h1 {
          margin: 28px 0 0;
          font-size: clamp(58px, 10vw, 120px);
          line-height: 0.9;
          letter-spacing: -0.065em;
        }

        .hero h1 span {
          color: #9ba8ff;
        }

        .hero p {
          max-width: 650px;
          margin: 30px auto 0;
          color: #858b9c;
          font-size: 17px;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-top: 35px;
        }

        .hero-button {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 14px 20px;
          border: 1px solid rgba(139, 156, 255, 0.45);
          border-radius: 11px;
          background: linear-gradient(
            135deg,
            #20294c,
            #151a2d
          );
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
        }

        .learn-button {
          color: #858b9c;
          text-decoration: none;
          font-size: 13px;
        }

        .feature-strip {
          max-width: 1050px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          margin: 150px auto 0;
          border-top: 1px solid #202638;
          border-bottom: 1px solid #202638;
        }

        .feature-strip div {
          padding: 30px;
          border-right: 1px solid #202638;
        }

        .feature-strip div:last-child {
          border-right: none;
        }

        .feature-strip strong {
          color: #626a7d;
          font-size: 10px;
        }

        .feature-strip h3 {
          margin: 20px 0 8px;
          font-size: 19px;
        }

        .feature-strip p {
          margin: 0;
          color: #70788d;
          font-size: 12px;
          line-height: 1.6;
        }

        .architecture-preview {
          max-width: 1050px;
          margin: 130px auto 0;
        }

        .eyebrow {
          color: #8b9cff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .preview-heading h2 {
          margin-top: 15px;
          font-size: clamp(35px, 5vw, 58px);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .preview-flow {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-top: 45px;
        }

        .preview-agent {
          min-height: 130px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 17px;
          border: 1px solid #202638;
          border-radius: 14px;
          background: #0b0e16;
        }

        .preview-agent span {
          color: #626a7d;
          font-size: 10px;
        }

        .preview-agent strong {
          font-size: 13px;
        }

        .landing-footer {
          max-width: 1050px;
          display: flex;
          justify-content: space-between;
          margin: 100px auto 0;
          padding-top: 20px;
          border-top: 1px solid #202638;
          color: #50586c;
          font-size: 10px;
        }

        @media (max-width: 800px) {
          .landing-page {
            padding: 0 24px 30px;
          }

          .hero {
            margin-top: 90px;
          }

          .feature-strip {
            grid-template-columns: 1fr;
          }

          .feature-strip div {
            border-right: none;
            border-bottom: 1px solid #202638;
          }

          .feature-strip div:last-child {
            border-bottom: none;
          }

          .preview-flow {
            grid-template-columns: 1fr;
          }

          .preview-agent {
            min-height: 90px;
          }
        }

        @media (max-width: 500px) {
          .nav-button {
            display: none;
          }

          .hero h1 {
            font-size: 57px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .landing-footer {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </main>
  );
}