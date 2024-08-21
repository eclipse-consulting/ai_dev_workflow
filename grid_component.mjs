import fs from "fs";
import path from "path";
import puppeteer from "puppeteer"; // used by dynamically generated test code

import winston from "winston";

import OpenAI from "openai";
const openai = new OpenAI();


async function fileExists(filePath) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}


// Define custom log levels
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warn: "yellow",
    info: "green",
    http: "cyan",
    debug: "blue",
  },
};

// Add colors to winston
winston.addColors(customLevels.colors);

const { combine, timestamp, printf, colorize } = winston.format;

// Define a custom format for the log messages
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create a Winston logger instance with custom levels and colors
const logger = winston.createLogger({
  levels: customLevels.levels,
  format: combine(
    colorize({ all: true }), // Colorize the output based on log level
    timestamp(), // Add timestamp to the log message
    customFormat // Apply the custom format
  ),
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

logger.info("This is HTML-based Editable Grid Component Generator v0.2");

const requirements = {
  project: "HTML-based Editable Grid Component",
  version: "1.0",
  overview: {
    description:
      "A web-based editable grid component designed to facilitate data input, editing, manipulation, and analysis within a web application. The component will be responsive, accessible, and optimized for both usability and performance, leveraging Tailwind CSS for styling.",
  },
  functional_requirements: {
    "FR-01": {
      title: "Table Structure",
      description: "Render a table with labeled rows and columns.",
      details: {
        rows: "Predefined row labels at the beginning of each row.",
        columns: "Predefined column labels at the top of the table.",
        content: "Remaining cells are editable.",
        styling: {
          responsive:
            "Use Tailwind CSS responsive utilities for screen-size adaptation.",
          focus: "Apply Tailwind focus utilities for keyboard navigation.",
        },
        accessibility:
          "Semantic HTML elements for better screen reader support.",
      },
    },
    "FR-02": {
      title: "Column Labels",
      description: "Include a set of predefined column labels.",
      details: {
        labels: "Column labels displayed in a left-aligned manner.",
        styling: {
          background:
            "Tailwind utilities to style the header row (e.g., bg-gray-200, text-gray-700).",
        },
      },
    },
    "FR-03": {
      title: "Row Labels",
      description: "Include a set of predefined row labels.",
      details: {
        labels: "Row labels displayed in a left-aligned manner.",
        styling: {
          background: "Tailwind utilities to style the first column.",
        },
      },
    },
    "FR-04": {
      title: "Editable Cells",
      description: "Allow cells within the table to be editable.",
      details: {
        behavior: "Cells editable by the user via contenteditable attribute.",
        visual_feedback: {
          default: "bg-indigo-50",
          focus: "focus:ring-2 focus:ring-blue-400",
          hover: "hover:bg-indigo-100",
        },
      },
    },
    "FR-05": {
      title: "Data Summarization and Aggregation",
      description: "Support aggregation functions applied to rows/columns.",
      details: {
        aggregation_functions: ["sum", "average", "count"],
        styling: {
          summary_row: "bg-gray-100 font-semibold",
          alignment: "text-right or text-center",
        },
      },
    },
    "FR-06": {
      title: "Dynamic Row and Column Manipulation",
      description:
        "Support dynamic addition, removal, and reordering of rows/columns.",
      details: {
        consistent_styling: "Ensure new rows/columns inherit existing styles.",
        transitions: {
          type: "Transition",
          classes: "transition ease-in-out duration-150",
        },
      },
    },
    "FR-07": {
      title: "Filtering and Sorting Capabilities",
      description: "Provide filtering and sorting options for the data.",
      details: {
        UI_controls:
          "Use Tailwind form controls for filters and sorting (e.g., form-select, form-input).",
        responsive_design:
          "Ensure filters are accessible on mobile devices using responsive classes.",
      },
    },
    "FR-08": {
      title: "Basic Data Validation and Formatting",
      description: "Include basic validation and formatting options.",
      details: {
        error_handling: "border-red-500 for errors, text-red-600 for messages.",
        success_indicators: "border-green-500 or text-green-600 for success.",
      },
    },
    "FR-09": {
      title: "Pivoting and Data Rearrangement",
      description: "Allow users to pivot data, rearranging rows and columns.",
      details: {
        seamless_transition: {
          type: "Animation",
          classes: "transition-all duration-200",
        },
        grid_flexibility:
          "Ensure dynamic grid layout using Tailwind's flexbox or grid utilities.",
      },
    },
    "FR-10": {
      title: "Styling and Usability",
      description: "Ensure the table is visually consistent and user-friendly.",
      details: {
        color_scheme:
          "Consistent colors using Tailwind utilities (e.g., text-gray-700, bg-gray-100).",
        typography:
          "Maintain good contrast and readability using Tailwind's typography utilities.",
        spacing: "Apply consistent spacing with px-4, py-2, and space-y-4.",
      },
    },
    "FR-11": {
      title: "Accessibility",
      description: "Ensure the table is accessible to users with disabilities.",
      details: {
        focus_management:
          "Apply focus:ring-2 and focus:ring-offset-2 to focused elements.",
        semantic_html:
          "Use semantic HTML elements for better screen reader support.",
      },
    },
    "FR-12": {
      title: "Usability Assistance",
      description:
        "Provide tooltips and help text to guide users on advanced features.",
      details: {
        tooltips:
          "Styled with Tailwind utilities (e.g., bg-black, text-white, rounded).",
        help_text:
          "Use text-sm, text-gray-600 for guidance below inputs or as tooltips.",
      },
    },
  },
  non_functional_requirements: {
    "NFR-01": {
      title: "Compatibility",
      description:
        "The component shall be compatible with modern web browsers.",
      details: {
        browsers: ["Chrome", "Firefox", "Safari", "Edge"],
        styling:
          "Tailwind CSS utilities for consistent styling across browsers.",
      },
    },
    "NFR-02": {
      title: "Performance",
      description:
        "The component shall load and be interactive within 2 seconds.",
      details: {
        optimization:
          "Use Tailwind's utility classes for efficient styling and layout rendering.",
      },
    },
    "NFR-03": {
      title: "Scalability",
      description: "The component shall handle large datasets efficiently.",
      details: {
        data_handling:
          "Leverage in-memory data structures and optimized algorithms for large datasets.",
      },
    },
    "NFR-04": {
      title: "Integration",
      description:
        "The component shall integrate seamlessly with backend systems.",
      details: {
        APIs: "Provide hooks for data import/export and interaction with backend services.",
      },
    },
  },
  assumptions: {
    "A-01":
      "The table structure (rows and columns) is predefined but can be dynamically modified by the user.",
    "A-02":
      "The editable grid will be integrated into a broader web application where advanced data validation and backend integration will be handled.",
  },
  constraints: {
    "C-01":
      "The grid component is designed for environments with JavaScript enabled.",
    "C-02":
      "The grid component provides basic validation and formatting, with complex validation handled by the application layer.",
  },
};

const requirementsString = JSON.stringify(requirements, null, 2);

const currentDir = process.cwd();
const outputDir = `${currentDir}/output/`;
logger.debug(`Current directory: ${currentDir}`);

async function generateCode() {
  logger.info(`Running OpenAI GPT-4 to generate HTML code.`);
  //logger.debug(`Specs: ${requirementsString}`);


  // load the current version of the code
  const outputCodePath = `${outputDir}/index.html`;
  //const codeUnderDevelopment = fs.promises.readFileSync(filePath, "utf-8");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a single page HTML/JS/CSS app developer and only respond in the form of valid, runnable single page HTML/JS/CSS content. You respond according to formal requirement specifications in JSON format.",
      },
      //{
      //  role: "system",
      //  content: "The current iteration of the code is as follows: ```html" + outputCodePath +  "```",
      //},
      {
        role: "user",
        content: `Please generate an HTML page meeting the following requirements: ${requirementsString} Please only response with code and without any explanations.`,
      },
    ],
  });

  const markdownString = completion.choices[0].message.content;

  // Regex pattern to match HTML code between ```html and ```
  const htmlRegex = /```html\s([\s\S]*?)\s```/g;

  // Extracting HTML
  const matches = markdownString.match(htmlRegex);

  // If there's a match, clean up and extract the HTML content
  let htmlCode = "";
  if (matches) {
    htmlCode = matches[0].replace(/```html\s/, "").replace(/\s```/, "");
    //console.log(htmlCode);
  } else {
    //console.log('No HTML code block found.');
    logger.error("No HTML code block found.");
  }

  //console.info(htmlCode);
  logger.info(`HTML code generation completed.`);
  logger.debug(`HTML code generated: ${htmlCode}`);

  // save the generated code to a file
  fs.promises.writeFile(outputCodePath, htmlCode);
}


async function generateTest() {
  // load the current version of the code
  const filePath = `${outputDir}/index.html`;
  const codeUnderTest = await fs.promises.readFile(filePath, "utf-8");

  const testCodeTemplatePath = path.join(currentDir, "testing_template.js");

  // load the test code template as a string
  const testCodeTemplate = await fs.promises.readFile(testCodeTemplatePath, "utf-8");


  //logger.debug(`Test code template: ${testCodeTemplate}`);

  logger.info(`Running OpenAI GPT-4 to generate test code.`);
  const test_code_completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a single page HTML/JS/CSS app test engineer and only respond in the form of valid, runnable JavaScript using puppeteer to implement a function to automatically test the user functionality of a single-page HTML app, and save screenshots of the website after each test case. You only output correct test code and do not provide any explanations.",
      },
      {
        role: "system",
        content: "Test code template: ```js" + testCodeTemplate + "```",
      },
      {
        role: "system",
        content:
          "The current iteration of the code is as follows: ```html" +
          codeUnderTest +
          "```",
      },
      {
        role: "system",
        content: `The current iteration of the formal requiresments specifications are: ${requirementsString}.`,
      },
      {
        role: "user",
        content: `Please generate the test function to test the HTML app by simulating user interactions and saving screenshots.`,
      },
    ],
  });

  const markdownString = test_code_completion.choices[0].message.content;
  //logger.info(`Test code markdown: ${markdownString}`);

    // Regex pattern to match JS code between ```js and ```
    const jsRegex = /```js\s([\s\S]*?)\s```/g;

    // Extracting HTML
    const matches = markdownString.match(jsRegex);
  
    // If there's a match, clean up and extract the HTML content
    let jsTestCode = "";
    if (matches) {
      jsTestCode = matches[0].replace(/```js\s/, "").replace(/\s```/, "");
    } else {
      logger.error("No HTML code block found.");
    }

    logger.info(`Test code generation completed: ${jsTestCode}`);

    // save the generated test code to a file
    const testCodePath = `${outputDir}/test.js`;
    await fs.promises.writeFile(testCodePath, jsTestCode);
}


async function runTest() {
  const testCodePath = `${outputDir}/test.js`;
  const testCode = await fs.promises.readFile(testCodePath, "utf-8");
  logger.info(`Running OpenAI generated HTML test automation code.`);
  try {
      eval(testCode);
  } catch (error) {
      logger.error(`Error running test code: ${error}`);
      throw error; // Re-throw the error after logging
  }
}



// Function to encode the image
async function encodeImage(imagePath) {
  const imageBuffer = await fs.promises.readFile(imagePath);
  return imageBuffer.toString("base64");
}

async function runUserAcceptanceTesting() {
  const filePath = `${outputDir}/index.html`;
  const codeUnderTest = await fs.promises.readFile(filePath, "utf-8");

  // list all png files in the current directory
  const files = await fs.promises.readdir(outputDir);
  const pngFiles = files.filter((file) => file.endsWith(".png"));

  const testCodePath = `${outputDir}/test.js`;
  const testCode = await fs.promises.readFile(testCodePath, "utf-8");

  for (const pngFile of pngFiles) {
    const base64_img = await encodeImage(`${outputDir}/${pngFile}`);
    logger.info(`Applying OpenAI vision API to PNG file: ${pngFile}`);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
            role: "system", 
            content: "You are a single page HTML/JS/CSS app user acceptance QA tester. You view screenshots of the HTML page and provide feedback on the user interface and functionality. You only respond with formal UAT feedback on the screenshots and do not provide any explanations.", 
        },
        {
          role: "system",
          content:
            "The current iteration of the code is as follows: ```html" +
            codeUnderTest +
            "```",
        },
        {
          role: "system",
          content: `The current iteration of the formal requiresments specifications are: ${requirementsString}.`,
        },
        {
          role: "system",
          content: "The current iteration of the test code is as follows: ```js" + testCode + "```",
        },
        {   
          role: "user",
          content: [
            { type: "text", text: `This is screenshot ${pngFile}, please provide UAT feedback.`},
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64_img}`
              },
            },
          ],
        },
      ],
    });

    // save the UAT feedback to a file
    const feedbackPath = `${outputDir}/${pngFile}.md`;
    await fs.promises.writeFile(feedbackPath, response.choices[0].message.content);
    logger.info(`UAT feedback saved to: ${feedbackPath}`);

  }
}

await generateCode();

const numTries = 3;
let tryCount = 0;
let success = false;

logger.info(`Attempting to generate code, test, and run user acceptance testing...`);
while(!success && tryCount < numTries) {
  try {
      await generateTest();
      logger.info(`HTML testing code generation successful.`);

      // Ensure the test file exists before attempting to run it
      const testFilePath = `${outputDir}/test.js`;
      const testFileExists = await fileExists(testFilePath);

      if (!testFileExists) {
          throw new Error("Test file not generated.");
      }

      await runTest();
      logger.info(`Test code execution successful.`);

      await runUserAcceptanceTesting();
      success = true;
  } catch (error) {
      logger.error(`Error generating code: ${error}`);
      tryCount++;
  }
}
if (success) {
  logger.info(`Code generation, testing, and user acceptance testing completed successfully.`);
} else {
  logger.error(`Failed to generate code, test, and run user acceptance testing after ${numTries} attempts.`);
}


