import { NextResponse } from "next/server";

type Task = {
  id: number;
  title: string;
  description: string;
  agent: string;
};

type AgentOutput = {
  agent: string;
  status: "completed";
  summary: string;
};

function detectWorkflow(goal: string) {
  const text = goal.toLowerCase();

  if (
    text.includes("python") ||
    text.includes("javascript") ||
    text.includes("java") ||
    text.includes("c language") ||
    text.includes("programming") ||
    text.includes("coding") ||
    text.includes("code") ||
    text.includes("loop") ||
    text.includes("function") ||
    text.includes("variable")
  ) {
    return "programming";
  }

  if (
    text.includes("learn") ||
    text.includes("study") ||
    text.includes("exam") ||
    text.includes("course") ||
    text.includes("education")
  ) {
    return "learning";
  }

  if (
    text.includes("hackathon") ||
    text.includes("project") ||
    text.includes("website") ||
    text.includes("app") ||
    text.includes("build")
  ) {
    return "project";
  }

  if (
    text.includes("fitness") ||
    text.includes("workout") ||
    text.includes("exercise")
  ) {
    return "fitness";
  }

  return "general";
}

function createPlan(
  workflow: string
): Task[] {
  if (workflow === "programming") {
    return [
      {
        id: 1,
        title: "Understand the programming question",
        description:
          "Analyze the question and identify the programming concept involved.",
        agent: "Orchestrator",
      },
      {
        id: 2,
        title: "Break down the problem",
        description:
          "Convert the question into smaller logical steps.",
        agent: "Planner",
      },
      {
        id: 3,
        title: "Retrieve relevant knowledge",
        description:
          "Identify the programming concepts and examples required for the answer.",
        agent: "Knowledge",
      },
      {
        id: 4,
        title: "Construct the answer",
        description:
          "Create a clear explanation and practical example.",
        agent: "Executor",
      },
      {
        id: 5,
        title: "Review the answer",
        description:
          "Check the explanation for clarity, consistency and missing information.",
        agent: "Reviewer",
      },
    ];
  }

  if (workflow === "learning") {
    return [
      {
        id: 1,
        title: "Understand the learning objective",
        description:
          "Identify what the user wants to learn and their expected outcome.",
        agent: "Orchestrator",
      },
      {
        id: 2,
        title: "Create a learning structure",
        description:
          "Break the subject into logical concepts and stages.",
        agent: "Planner",
      },
      {
        id: 3,
        title: "Organize knowledge",
        description:
          "Identify important concepts, examples and practice areas.",
        agent: "Knowledge",
      },
      {
        id: 4,
        title: "Create the response",
        description:
          "Turn the information into a practical and understandable answer.",
        agent: "Executor",
      },
      {
        id: 5,
        title: "Review the response",
        description:
          "Check the answer for completeness and clarity.",
        agent: "Reviewer",
      },
    ];
  }

  if (workflow === "project") {
    return [
      {
        id: 1,
        title: "Understand the project",
        description:
          "Analyze the requested project and identify its main objective.",
        agent: "Orchestrator",
      },
      {
        id: 2,
        title: "Design the solution",
        description:
          "Break the project into features and implementation stages.",
        agent: "Planner",
      },
      {
        id: 3,
        title: "Identify technologies",
        description:
          "Organize the technical concepts and tools required.",
        agent: "Knowledge",
      },
      {
        id: 4,
        title: "Create implementation guidance",
        description:
          "Convert the design into practical development actions.",
        agent: "Executor",
      },
      {
        id: 5,
        title: "Review the solution",
        description:
          "Check the proposed solution for missing components.",
        agent: "Reviewer",
      },
    ];
  }

  if (workflow === "fitness") {
    return [
      {
        id: 1,
        title: "Understand the objective",
        description:
          "Identify the user's requested fitness objective.",
        agent: "Orchestrator",
      },
      {
        id: 2,
        title: "Create a structured plan",
        description:
          "Break the objective into practical activities.",
        agent: "Planner",
      },
      {
        id: 3,
        title: "Organize supporting information",
        description:
          "Identify relevant exercise and lifestyle considerations.",
        agent: "Knowledge",
      },
      {
        id: 4,
        title: "Create the action plan",
        description:
          "Turn the information into a clear sequence of actions.",
        agent: "Executor",
      },
      {
        id: 5,
        title: "Review the plan",
        description:
          "Check the plan for consistency and missing areas.",
        agent: "Reviewer",
      },
    ];
  }

  return [
    {
      id: 1,
      title: "Understand the question",
      description:
        "Analyze the user's goal and determine what information is required.",
      agent: "Orchestrator",
    },
    {
      id: 2,
      title: "Break down the problem",
      description:
        "Divide the question into smaller logical components.",
      agent: "Planner",
    },
    {
      id: 3,
      title: "Organize relevant knowledge",
      description:
        "Identify the information required to construct the response.",
      agent: "Knowledge",
    },
    {
      id: 4,
      title: "Construct the response",
      description:
        "Create a clear and useful response from the available information.",
      agent: "Executor",
    },
    {
      id: 5,
      title: "Review the response",
      description:
        "Check the final response for completeness and consistency.",
      agent: "Reviewer",
    },
  ];
}

function generateAnswer(
  question: string,
  workflow: string
) {
  const text = question.toLowerCase();

  if (
    text.includes("what is python") ||
    text.includes("python")
  ) {
    return `Python is a high-level, general-purpose programming language known for its simple and readable syntax.

It is commonly used for:

• Web development
• Automation
• Data analysis
• Artificial intelligence
• Machine learning
• Software development

Example:

print("Hello World")

This tells Python to display the text "Hello World".

Because Python has relatively simple syntax, it is also commonly used as a first programming language for beginners.

CODEX AI classified this as a programming question and coordinated the response through its multi-agent workflow.`;
  }

  if (
    text.includes("what is loop") ||
    text.includes("what are loops") ||
    text.includes("loops in python")
  ) {
    return `A loop in Python is used to repeat a block of code.

There are two commonly used loops:

1. for loop

Example:

for i in range(5):
    print(i)

This prints:

0
1
2
3
4

2. while loop

Example:

i = 0

while i < 5:
    print(i)
    i += 1

The while loop continues running while its condition is true.

In simple words:

A loop = repeat an instruction multiple times.

CODEX AI classified this as a programming question and generated the explanation through its agent workflow.`;
  }

  if (
    text.includes("hello world") ||
    text.includes("print hello")
  ) {
    return `In Python, you can print "Hello World" using:

print("Hello World")

The print() function displays information on the screen.

Example:

print("Hello World")
print("Welcome to Python")

Output:

Hello World
Welcome to Python

This is one of the simplest programs you can write when starting Python.`;
  }

  if (
    text.includes("variable") &&
    text.includes("python")
  ) {
    return `A variable in Python is a name used to store a value.

Example:

name = "Akhil"
age = 17

Here:

name stores the text "Akhil".

age stores the number 17.

You can then use the variables:

print(name)
print(age)

Output:

Akhil
17

Python automatically determines the type of value stored in the variable.`;
  }

  if (workflow === "programming") {
    return `I understood your question as a programming-related problem.

CODEX AI has:

1. Analyzed the question
2. Identified the programming workflow
3. Broken the problem into tasks
4. Organized the relevant concepts
5. Prepared the response
6. Sent the result through a review stage

For a more specific explanation, include the exact programming question or code you want help with.`;
  }

  return `I understood your request and created a coordinated workflow for it.

CODEX AI processed your request through:

1. Orchestrator — understood the objective
2. Planner — divided the objective into tasks
3. Knowledge — organized relevant information
4. Executor — constructed the response
5. Reviewer — checked the response

Your request:

"${question}"

The current version uses a local demonstration knowledge layer. The next AI integration phase can connect this workflow to a real AI model so CODEX AI can answer a much wider range of questions.`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const goal =
      typeof body.goal === "string"
        ? body.goal.trim()
        : "";

    if (!goal) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a question or goal.",
        },
        {
          status: 400,
        }
      );
    }

    const workflow = detectWorkflow(goal);

    const tasks = createPlan(workflow);

    const answer = generateAnswer(
      goal,
      workflow
    );

    const agentOutputs: AgentOutput[] = [
      {
        agent: "Orchestrator",
        status: "completed",
        summary:
          "Goal received and workflow initialized.",
      },
      {
        agent: "Planner",
        status: "completed",
        summary:
          "The request was divided into logical processing tasks.",
      },
      {
        agent: "Knowledge",
        status: "completed",
        summary:
          "Relevant concepts were identified for the response.",
      },
      {
        agent: "Executor",
        status: "completed",
        summary:
          "A structured response was constructed.",
      },
      {
        agent: "Reviewer",
        status: "completed",
        summary:
          "The response was checked for basic completeness and consistency.",
      },
    ];

    return NextResponse.json({
      success: true,
      mode: "local-demo",
      goal,
      workflow,
      tasks,
      agentOutputs,
      finalResult: answer,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while processing the request.",
      },
      {
        status: 500,
      }
    );
  }
}