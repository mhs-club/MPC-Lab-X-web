/**
 * @file public/js/components/problems-printer.js
 * @description Problems printer component.
 */

class ProblemsPrinter extends Problems {
  /**
   * @constructor - Initializes the ProblemsPrinter class.
   * @param {HTMLElement} element - The element to bind the component to.
   */
  constructor(element) {
    super(element);
    this.element = element;

    this.renderComplexity = 0;
  }

  /**
   * @method render - Renders the tasks.
   * @param {Array<Object>} tasks - The tasks to render.
   * @param {Object} options - The options to render the tasks.
   * @param {string} options.name - The name of the task. (Required if displayTitlePage is true)
   * @param {string} options.description - The description of the task. (Required if displayTitlePage is true)
   * @param {string} options.schoolName - The name of the school.
   * @param {string} options.teacherName - The name of the teacher.
   * @param {boolean} options.withAnswers - The flag to render the answers and steps.
   * @param {boolean} options.twoColumns - The flag to render the problems in two columns.
   * @param {boolean} options.displayTitlePage - The flag to display the title page.
   * @param {boolean} options.displayStudentId - The flag to display the student id.
   * @param {boolean} options.displayStudentName - The flag to display the student name.
   */
  async render(tasks, options) {
    this.renderComplexity = 0;
    this.element.style.display = "block";

    this.element.innerHTML = "";
    for (const task of tasks) {
      const taskElement = this.renderTask({
        ...options,
        ...task,
      });
      this.element.appendChild(taskElement);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        this.element.style.display = "none";
        resolve();
      }, 50 * this.renderComplexity);
    });
  }

  /**
   * @method renderTask - Renders a task.
   * @param {Object} task - The task to render.
   * @param {Array<Object>} task.problems - The problems to render.
   * @param {string} task.name - The name of the task. (Required if displayTitlePage is true)
   * @param {string} task.description - The description of the task. (Required if displayTitlePage is true)
   * @param {string} task.schoolName - The name of the school.
   * @param {string} task.teacherName - The name of the teacher.
   * @param {string} task.studentId - The student id.
   * @param {string} task.studentName - The student name.
   * @param {boolean} task.withAnswers - The flag to render the answers and steps.
   * @param {boolean} task.twoColumns - The flag to render the problems in two columns.
   * @param {boolean} task.displayTitlePage - The flag to display the title page.
   * @param {boolean} task.displayStudentId - The flag to display the student id.
   * @param {boolean} task.displayStudentName - The flag to display the student name.
   * @returns {HTMLElement} - The rendered task element.
   */
  renderTask(task) {
    const taskElement = document.createElement("section");
    taskElement.className = "task";

    if (task.displayTitlePage) {
      const titlePageElement = this.renderTitlePage(task);
      taskElement.appendChild(titlePageElement);
    }

    const problemsElement = this.renderProblems(
      task.problems,
      task.withAnswers,
      task.twoColumns
    );
    taskElement.appendChild(problemsElement);

    return taskElement;
  }

  /**
   * @method renderTitlePage - Renders a title page.
   * @param {Object} task - The task to render.
   * @param {string} task.name - The name of the task.
   * @param {string} task.description - The description of the task.
   * @param {string} task.schoolName - The name of the school.
   * @param {string} task.teacherName - The name of the teacher.
   * @param {string} task.studentId - The student id.
   * @param {string} task.studentName - The student name.
   * @param {boolean} task.displayStudentId - The flag to display the student id.
   * @param {boolean} task.displayStudentName - The flag to display the student name.
   * @returns {HTMLElement} - The rendered title page element.
   */
  renderTitlePage(task) {
    const titlePageElement = document.createElement("div");
    titlePageElement.className = "title-page";

    if (task.schoolName) {
      const schoolNameElement = document.createElement("p");
      schoolNameElement.className = "school";
      schoolNameElement.textContent = task.schoolName;
      titlePageElement.appendChild(schoolNameElement);
    }

    if (task.name) {
      const taskNameElement = document.createElement("h1");
      taskNameElement.className = "title";
      taskNameElement.textContent = task.name;
      titlePageElement.appendChild(taskNameElement);
    }

    if (task.description) {
      const taskDescriptionElement = document.createElement("p");
      taskDescriptionElement.className = "description";
      taskDescriptionElement.textContent = task.description;
      titlePageElement.appendChild(taskDescriptionElement);
    }

    if (task.teacherName) {
      const teacherNameElement = document.createElement("p");
      teacherNameElement.className = "teacher";
      teacherNameElement.textContent = task.teacherName;
      titlePageElement.appendChild(teacherNameElement);
    }

    if (task.studentId || task.studentName) {
      const studentInfoElement = document.createElement("div");
      studentInfoElement.className = "student-info";

      if (task.studentId && task.displayStudentId) {
        const studentIdElement = document.createElement("p");
        studentIdElement.className = "student-id";
        studentIdElement.textContent = "SID: " + task.studentId;
        studentInfoElement.appendChild(studentIdElement);
      }

      if (task.studentName && task.displayStudentName) {
        const studentNameElement = document.createElement("p");
        studentNameElement.className = "student-name";
        studentNameElement.textContent = task.studentName;
        studentInfoElement.appendChild(studentNameElement);
      }

      titlePageElement.appendChild(studentInfoElement);
    }

    return titlePageElement;
  }

  /**
   * @method renderProblems - Renders a list of problems.
   * @param {Array<Object>} problems - The problems to render.
   * @param {boolean} withAnswers - The flag to render the answers and steps.
   * @param {boolean} twoColumns - The flag to render the problems in two columns.
   * @returns {HTMLElement} - The rendered problems element.
   */
  renderProblems(problems, withAnswers, twoColumns) {
    const problemsElement = document.createElement("div");
    problemsElement.className = "problem-section";
    if (twoColumns) {
      problemsElement.classList.add("two-columns");
    }

    for (let i = 0; i < problems.length; i++) {
      const problemElement = this.renderProblem(problems[i], i, withAnswers);
      problemsElement.appendChild(problemElement);
    }

    return problemsElement;
  }

  /**
   * @method renderProblem - Renders a problem.
   * @param {Object} problem - The problem to render.
   * @param {number} index - The index of the problem.
   * @param {boolean} withAnswers - The flag to render the answers and steps.
   * @returns {HTMLElement} - The rendered problem element.
   */
  renderProblem(problem, index, withAnswers) {
    const problemElement = document.createElement("div");
    problemElement.className = "problem";

    const problemHeaderElement = document.createElement("h2");
    problemHeaderElement.textContent = `Problem ${index + 1}`;
    problemElement.appendChild(problemHeaderElement);

    for (const key in problem) {
      const problemPartsElement = document.createElement("div");

      if (key === "problem") {
        for (const problemPart of problem[key]) {
          if (problemPart.type === "graph") {
            this.renderComplexity++;
            problemPart.value.printMode = true;
          } else if (problemPart.type === "options") {
            for (const option of problemPart.value) {
              if (option.type === "graph") {
                this.renderComplexity++;
                option.value.printMode = true;
              }
            }
          }
          this.renderProblemPart(problemPartsElement, problemPart);
        }
        if (!withAnswers) {
          for (const problemPart of problem["solution"]) {
            if (problemPart.type === "graph") {
              this.renderComplexity++;
              const emptyCoordinateElement = this.renderEmptyCoordinate();
              problemPartsElement.appendChild(emptyCoordinateElement);
            } else if (problemPart.type !== "options") {
              const problemPlaceholderElement = this.renderProblemPlaceholder();
              problemPartsElement.appendChild(problemPlaceholderElement);
            }
          }
        }
      } else if (withAnswers) {
        if (key === "steps") {
          problemPartsElement.className = "steps";
          for (const step of problem[key]) {
            if (step.type === "graph") {
              this.renderComplexity++;
              step.value.printMode = true;
            } else if (step.type === "options") {
              for (const option of step.value) {
                if (option.type === "graph") {
                  this.renderComplexity++;
                  option.value.printMode = true;
                }
              }
            }
            this.renderProblemPart(problemPartsElement, step);
          }
        } else if (key === "solution") {
          problemPartsElement.className = "answer";
          for (const solution of problem[key]) {
            if (solution.type === "graph") {
              this.renderComplexity++;
              solution.value.printMode = true;
            } else if (solution.type === "options") {
              for (const option of solution.value) {
                if (option.type === "graph") {
                  this.renderComplexity++;
                  option.value.printMode = true;
                }
              }
            }
            this.renderProblemSolution(problemPartsElement, solution);
          }
        }
      }

      problemElement.appendChild(problemPartsElement);
    }

    return problemElement;
  }

  /**
   * @method renderProblemPlaceholder - Renders a problem placeholder.
   * @returns {HTMLElement} - The rendered problem placeholder element.
   */
  renderProblemPlaceholder() {
    const problemPlaceholderElement = document.createElement("div");
    problemPlaceholderElement.className = "problem-placeholder";
    return problemPlaceholderElement;
  }

  /**
   * @method renderEmptyCoordinate - Renders an empty coordinate.
   * @returns {HTMLElement} - The rendered empty coordinate element.
   */
  renderEmptyCoordinate() {
    const emptyCoordinateElement = this.renderProblemGraph({
      renderEngine: "desmos",
      mathBounds: {
        left: -5,
        right: 5,
        bottom: -5,
        top: 5,
      },
      options: {
        xAxisArrowMode: "BOTH",
        yAxisArrowMode: "BOTH",
        xAxisNumbers: false,
        yAxisNumbers: false,
      },
      printMode: true,
    });
    return emptyCoordinateElement;
  }

  /**
   * @method print - Prints the tasks.
   */
  print() {
    window.print();
  }
}
