"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  agent: string;
};

type AgentState =
  | "waiting"
  | "processing"
  | "completed";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  workflow?: string;
};

const agents = [
  {
    name: "Orchestrator",
    short: "Goal understood",
  },
  {
    name: "Planner",
    short: "Tasks created",
  },
  {
    name: "Knowledge",
    short: "Knowledge gathered",
  },
  {
    name: "Executor",
    short: "Generating response",
  },
  {
    name: "Reviewer",
    short: "Validating result",
  },
];

const suggestions = [
  "Explain Python loops for a beginner",
  "What is artificial intelligence?",
  "Create a 30-day Python learning plan",
  "Help me build a college project",
];

export default function Dashboard() {
  const [goal, setGoal] = useState("");
  const [running, setRunning] = useState(false);
  const [activeAgent, setActiveAgent] = useState(-1);
  const [completed, setCompleted] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [finalResult, setFinalResult] = useState("");
  const [activity, setActivity] = useState<string[]>([]);
  const [workflowType, setWorkflowType] =
    useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] =
    useState<Message[]>([]);
  const [copied, setCopied] = useState(false);

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const conversationRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) return;

    if (activeAgent >= agents.length - 1) {
      const timer = setTimeout(() => {
        setRunning(false);
        setCompleted(true);

        setActivity((previous) => [
          ...previous,
          "Reviewer completed",
          "Workflow completed successfully",
        ]);
      }, 1200);

      return () => clearTimeout(timer);
    }

    if (activeAgent < 0) return;

    const timer = setTimeout(() => {
      const currentAgent =
        agents[activeAgent];

      const nextAgent =
        agents[activeAgent + 1];

      if (!currentAgent || !nextAgent) {
        return;
      }

      setActivity((previous) => [
        ...previous,
        `${currentAgent.name} completed`,
        `${nextAgent.name} started`,
      ]);

      setActiveAgent(
        (current) => current + 1
      );
    }, 1200);

    return () => clearTimeout(timer);
  }, [running, activeAgent]);

  useEffect(() => {
    if (!conversationRef.current) return;

    conversationRef.current.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, running]);

  async function startWorkflow(
    customGoal?: string
  ) {
    const question = (
      customGoal ?? goal
    ).trim();

    if (!question) {
      setError(
        "Please enter a question or goal first."
      );

      textareaRef.current?.focus();

      return;
    }

    setGoal(question);
    setError("");
    setTasks([]);
    setFinalResult("");
    setWorkflowType("");
    setCompleted(false);
    setRunning(true);
    setActiveAgent(0);
    setCopied(false);

    setActivity([
      "Goal received",
      "Orchestrator started",
    ]);

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: question,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    try {
      const response = await fetch(
        "/api/agent",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            goal: question,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Workflow failed."
        );
      }

      setTasks(data.tasks || []);

      setFinalResult(
        data.finalResult || ""
      );

      setWorkflowType(
        data.workflow || "general"
      );

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          data.finalResult ||
          "The workflow completed without a final response.",
        workflow:
          data.workflow || "general",
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);

      setActivity((previous) => [
        ...previous,
        "Goal analyzed",
        `Detected ${data.workflow} workflow`,
        "Execution plan created",
      ]);
    } catch (err) {
      setRunning(false);
      setActiveAgent(-1);

      const message =
        err instanceof Error
          ? err.message
          : "Unable to connect to the backend.";

      setError(message);

      setActivity((previous) => [
        ...previous,
        "Workflow failed",
      ]);
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      if (!running) {
        startWorkflow();
      }
    }
  }

  function newChat() {
    setGoal("");
    setRunning(false);
    setActiveAgent(-1);
    setCompleted(false);
    setTasks([]);
    setFinalResult("");
    setActivity([]);
    setWorkflowType("");
    setError("");
    setMessages([]);
    setCopied(false);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  }

  function useSuggestion(
    suggestion: string
  ) {
    setGoal(suggestion);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  }

  async function copyResponse() {
    if (!finalResult) return;

    try {
      await navigator.clipboard.writeText(
        finalResult
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setError(
        "Unable to copy the response."
      );
    }
  }

  function regenerate() {
    if (!goal.trim() || running) return;

    startWorkflow(goal);
  }

  function getAgentState(
    index: number
  ): AgentState {
    if (completed) {
      return "completed";
    }

    if (running) {
      if (index < activeAgent) {
        return "completed";
      }

      if (index === activeAgent) {
        return "processing";
      }
    }

    return "waiting";
  }

  function getCurrentTask() {
    if (
      running &&
      activeAgent >= 0
    ) {
      return (
        agents[activeAgent]?.name ||
        "Processing"
      );
    }

    if (completed) {
      return "Workflow completed";
    }

    return "Waiting for request";
  }

  return (
    <main className="codex-shell">

      {/* TOP BAR */}

      <header className="codex-topbar">
        <div className="mobile-brand">
          <div className="codex-logo">
            CX
          </div>

          <div>
            <div className="codex-brand-name">
              CODEX AI
            </div>

            <div className="codex-brand-tagline">
              Think. Plan. Act.
            </div>
          </div>
        </div>

        <div className="topbar-spacer" />

        <div className="engine-status">
          <span className="online-dot" />
          Demo Engine Online
        </div>

        <button
          className="profile-button"
          aria-label="Profile"
        >
          A
        </button>
      </header>

      {/* LEFT SIDEBAR */}

      <aside className="codex-sidebar">

        <div className="sidebar-brand">
          <div className="codex-logo">
            CX
          </div>

          <div>
            <div className="codex-brand-name">
              CODEX AI
            </div>

            <div className="codex-brand-tagline">
              Think. Plan. Act.
            </div>
          </div>
        </div>

        <button
          className="new-chat-button"
          onClick={newChat}
        >
          <span className="nav-icon">
            +
          </span>

          <span>New Chat</span>
        </button>

        <nav className="sidebar-nav">

          <button className="nav-item">
            <span>⌂</span>
            Home
          </button>

          <button className="nav-item active">
            <span>◌</span>
            Chat
          </button>

          <button className="nav-item">
            <span>✣</span>
            Workflows
          </button>

          <button className="nav-item">
            <span>▦</span>
            Knowledge
          </button>

          <button className="nav-item">
            <span>⚙</span>
            Settings
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="multi-agent-card">

            <div className="multi-agent-icon">
              ✦
            </div>

            <strong>
              Multi-Agent AI
            </strong>

            <p>
              5 specialized agents working
              together for better results.
            </p>

          </div>

          <div className="sidebar-footer-brand">

            <div className="mini-logo">
              CX
            </div>

            <div>
              <strong>
                CODEX AI
              </strong>

              <span>
                Think. Plan. Act.
              </span>
            </div>

          </div>

        </div>

      </aside>

      {/* MAIN CHAT */}

      <section className="codex-main">

        <div className="chat-header">

          <div className="chat-header-title">

            <div className="chat-header-icon">
              ◉
            </div>

            <div>
              <h1>Chat</h1>

              <p>
                Ask anything. Get intelligent
                answers.
              </p>
            </div>

          </div>

          {workflowType && (
            <div className="workflow-pill">
              <span>✦</span>
              {workflowType} workflow
            </div>
          )}

        </div>

        <div
          className="conversation-area"
          ref={conversationRef}
        >

          {messages.length === 0 ? (

            <div className="empty-chat">

              <div className="empty-chat-icon">
                CX
              </div>

              <h2>
                How can CODEX AI help?
              </h2>

              <p>
                Ask a question or give me a
                goal. I&apos;ll analyze it,
                plan the work and generate a
                reviewed response.
              </p>

              <div className="empty-suggestions">

                {suggestions.map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() =>
                        useSuggestion(
                          suggestion
                        )
                      }
                    >
                      {suggestion}
                    </button>
                  )
                )}

              </div>

            </div>

          ) : (

            <div className="message-list">

              {messages.map((message) => (

                <div
                  key={message.id}
                  className={`chat-message ${
                    message.role === "user"
                      ? "user-message"
                      : "ai-message"
                  }`}
                >

                  <div className="message-avatar">
                    {message.role === "user"
                      ? "A"
                      : "CX"}
                  </div>

                  <div className="message-column">

                    <div className="message-meta">

                      <strong>
                        {message.role ===
                        "user"
                          ? "You"
                          : "CODEX AI"}
                      </strong>

                      {message.role ===
                        "assistant" &&
                        message.workflow && (
                          <span>
                            Using 5-Agent
                            Workflow
                          </span>
                        )}

                    </div>

                    <div className="message-bubble">

                      <div className="message-text">
                        {message.content}
                      </div>

                      {message.role ===
                        "assistant" && (

                        <div className="answer-actions">

                          <button
                            onClick={
                              copyResponse
                            }
                          >
                            {copied
                              ? "✓ Copied"
                              : "Copy"}
                          </button>

                          <button
                            onClick={
                              regenerate
                            }
                            disabled={running}
                          >
                            ↻ Regenerate
                          </button>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              ))}

              {running && (

                <div className="chat-message ai-message">

                  <div className="message-avatar">
                    CX
                  </div>

                  <div className="message-column">

                    <div className="message-meta">

                      <strong>
                        CODEX AI
                      </strong>

                      <span>
                        Agent workflow active
                      </span>

                    </div>

                    <div className="thinking-bubble">

                      <span />
                      <span />
                      <span />

                      <p>
                        {getCurrentTask()}...
                      </p>

                    </div>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

        {/* INPUT BOX */}

        <div className="composer-area">

          <div className="composer">

            <textarea
              ref={textareaRef}
              value={goal}
              onChange={(event) =>
                setGoal(event.target.value)
              }
              onKeyDown={handleKeyDown}
              disabled={running}
              rows={1}
              placeholder="Type your message here..."
            />

            <button
              className="send-button"
              onClick={() =>
                startWorkflow()
              }
              disabled={
                running ||
                !goal.trim()
              }
              aria-label="Send message"
            >
              →
            </button>

          </div>

          <div className="composer-footer">

            <span>
              Press Enter to send
            </span>

            <span>•</span>

            <span>
              Shift + Enter for new line
            </span>

            <span className="composer-powered">
              CODEX AI
            </span>

          </div>

          {error && (
            <div className="composer-error">
              {error}
            </div>
          )}

        </div>

      </section>

      {/* RIGHT SIDEBAR */}

      <aside className="workspace-sidebar">

        {/* WORKFLOW */}

        <section className="side-card">

          <div className="side-card-header">

            <div className="side-title">

              <span className="side-title-icon">
                ✣
              </span>

              <strong>
                Workflow
              </strong>

            </div>

            {workflowType && (
              <span className="side-pill">
                {workflowType}
              </span>
            )}

          </div>

          <div className="agent-status-list">

            {agents.map(
              (agent, index) => {

                const state =
                  getAgentState(index);

                return (

                  <div
                    className={`agent-status-row ${state}`}
                    key={agent.name}
                  >

                    <div className="agent-status-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div className="agent-status-info">

                      <strong>
                        {agent.name}
                      </strong>

                      <span>
                        {state === "processing"
                          ? "Processing..."
                          : state ===
                            "completed"
                          ? agent.short
                          : "Waiting"}
                      </span>

                    </div>

                    <div className="agent-check">

                      {state === "completed"
                        ? "✓"
                        : state === "processing"
                        ? "•"
                        : ""}

                    </div>

                  </div>

                );
              }
            )}

          </div>

        </section>

        {/* CURRENT TASK */}

        <section className="side-card current-task-card">

          <div className="side-card-header">

            <div className="side-title">

              <span className="side-title-icon">
                ◈
              </span>

              <strong>
                Current Task
              </strong>

            </div>

            <span className="step-counter">

              {running
                ? `Step ${
                    Math.min(
                      activeAgent + 1,
                      5
                    )
                  }/5`
                : completed
                ? "5/5"
                : "—"}

            </span>

          </div>

          <h3>
            {running
              ? getCurrentTask()
              : completed
              ? "Workflow completed"
              : "Waiting for request"}
          </h3>

          <p>
            {running
              ? "Processing your request with the agent workflow..."
              : completed
              ? "Your request has been processed and reviewed."
              : "Start a conversation to activate the workflow."}
          </p>

          {running && (
            <div className="progress-track">

              <div
                className="progress-bar"
                style={{
                  width: `${
                    ((activeAgent + 1) /
                      agents.length) *
                    100
                  }%`,
                }}
              />

            </div>
          )}

        </section>

        {/* ACTIVITY */}

        <section className="side-card">

          <div className="side-card-header">

            <div className="side-title">

              <span className="side-title-icon">
                ◷
              </span>

              <strong>
                Recent Activity
              </strong>

            </div>

          </div>

          <div className="activity-list">

            {activity.length === 0 ? (

              <div className="side-empty">
                Activity will appear here.
              </div>

            ) : (

              activity
                .slice(-6)
                .map(
                  (item, index) => (

                    <div
                      className="activity-row"
                      key={`${item}-${index}`}
                    >

                      <span className="activity-dot" />

                      <div>

                        <p>
                          {item}
                        </p>

                        <small>
                          Step{" "}
                          {Math.max(
                            activity.length -
                              5 +
                              index,
                            1
                          )}
                        </small>

                      </div>

                    </div>

                  )
                )

            )}

          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section className="side-card">

          <div className="side-card-header">

            <div className="side-title">

              <span className="side-title-icon">
                ⚡
              </span>

              <strong>
                Quick Actions
              </strong>

            </div>

          </div>

          <div className="quick-actions">

            <button onClick={newChat}>
              <span>◌</span>
              New Chat
              <b>›</b>
            </button>

            <button
              onClick={regenerate}
              disabled={
                !goal.trim() || running
              }
            >
              <span>↻</span>
              Regenerate Answer
              <b>›</b>
            </button>

            <button
              onClick={copyResponse}
              disabled={!finalResult}
            >
              <span>▢</span>
              Copy Response
              <b>›</b>
            </button>

          </div>

        </section>

        {/* SUGGESTIONS */}

        <section className="side-card suggestions-card">

          <div className="side-card-header">

            <div className="side-title">

              <span className="side-title-icon">
                ✦
              </span>

              <strong>
                Suggested Questions
              </strong>

            </div>

          </div>

          <div className="side-suggestions">

            {suggestions.map(
              (suggestion) => (

                <button
                  key={suggestion}
                  onClick={() =>
                    useSuggestion(
                      suggestion
                    )
                  }
                >
                  {suggestion}
                </button>

              )
            )}

          </div>

        </section>

      </aside>

    </main>
  );
}