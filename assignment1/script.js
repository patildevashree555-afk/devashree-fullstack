/* =====================================
   ADD SUBJECT
===================================== */

let subjectCount = 0;


function addSubject() {

    subjectCount++;

    const extraSubjects =
        document.getElementById("extraSubjects");


    const subjectBox =
        document.createElement("div");


    subjectBox.className = "extra-subject";


    subjectBox.innerHTML = `

        <div class="form-group">

            <label>
                Extra Subject ${subjectCount}
            </label>

            <input
                type="text"
                class="extra-name"
                placeholder="Enter subject name">

        </div>


        <div class="form-group">

            <label>
                Marks
            </label>

            <input
                type="number"
                class="extra-mark"
                min="0"
                max="100"
                placeholder="Marks out of 100">

        </div>

    `;


    extraSubjects.appendChild(subjectBox);
}


/* =====================================
   GENERATE RESULT
===================================== */

function generateResult() {

    const name =
        document.getElementById("studentName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const course =
        document.getElementById("course").value;


    const html =
        document.getElementById("htmlMarks").value;

    const css =
        document.getElementById("cssMarks").value;

    const javascript =
        document.getElementById("jsMarks").value;

    const python =
        document.getElementById("pythonMarks").value;


    /* =====================================
       VALIDATION
    ===================================== */

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        course === "" ||
        html === "" ||
        css === "" ||
        javascript === "" ||
        python === ""
    ) {

        alert("Please fill all student details and marks.");

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10 digit phone number.");

        return;
    }


    const marks = [

        Number(html),
        Number(css),
        Number(javascript),
        Number(python)

    ];


    for (let mark of marks) {

        if (mark < 0 || mark > 100) {

            alert("Marks must be between 0 and 100.");

            return;
        }
    }


    /* =====================================
       SUBJECT DATA
    ===================================== */

    let subjects = [

        {
            name: "HTML",
            marks: Number(html)
        },

        {
            name: "CSS",
            marks: Number(css)
        },

        {
            name: "JavaScript",
            marks: Number(javascript)
        },

        {
            name: "Python",
            marks: Number(python)
        }

    ];


    /* =====================================
       EXTRA SUBJECTS
    ===================================== */

    const extraNames =
        document.querySelectorAll(".extra-name");

    const extraMarks =
        document.querySelectorAll(".extra-mark");


    for (let i = 0; i < extraNames.length; i++) {

        const subjectName =
            extraNames[i].value.trim();

        const subjectMark =
            extraMarks[i].value;


        if (subjectName === "" || subjectMark === "") {

            alert("Please complete the extra subject details.");

            return;
        }


        if (
            Number(subjectMark) < 0 ||
            Number(subjectMark) > 100
        ) {

            alert("Extra subject marks must be between 0 and 100.");

            return;
        }


        subjects.push({

            name: subjectName,

            marks: Number(subjectMark)

        });

    }


    /* =====================================
       CALCULATIONS
    ===================================== */

    let total = 0;

    let failed = false;


    subjects.forEach(function(subject) {

        total += subject.marks;


        if (subject.marks < 40) {

            failed = true;

        }

    });


    const maximumMarks =
        subjects.length * 100;


    const percentage =
        (total / maximumMarks) * 100;


    let grade;


    if (percentage >= 90) {

        grade = "A+";

    }
    else if (percentage >= 80) {

        grade = "A";

    }
    else if (percentage >= 70) {

        grade = "B";

    }
    else if (percentage >= 60) {

        grade = "C";

    }
    else if (percentage >= 50) {

        grade = "D";

    }
    else {

        grade = "F";

    }


    const status =
        failed ? "FAIL" : "PASS";


    /* =====================================
       SUBJECT TABLE
    ===================================== */

    let tableRows = "";


    subjects.forEach(function(subject) {

        tableRows += `

            <tr>

                <td>${subject.name}</td>

                <td>${subject.marks}</td>

            </tr>

        `;

    });


    /* =====================================
       DISPLAY RESULT
    ===================================== */

    document.getElementById("resultMessage").innerText =
        "Result generated successfully.";


    document.getElementById("resultContent").innerHTML = `

        <div class="student-info">

            <p>
                <strong>Student Name</strong>
                ${name}
            </p>

            <p>
                <strong>Email</strong>
                ${email}
            </p>

            <p>
                <strong>Phone</strong>
                ${phone}
            </p>

            <p>
                <strong>Course</strong>
                ${course}
            </p>

        </div>


        <h3 class="marks-title">
            Subject Marks
        </h3>


        <table class="marks-table">

            <tr>

                <th>Subject</th>

                <th>Marks</th>

            </tr>

            ${tableRows}

        </table>


        <div class="result-summary">

            <p>

                <strong>Total Marks</strong>

                ${total} / ${maximumMarks}

            </p>


            <p>

                <strong>Percentage</strong>

                ${percentage.toFixed(2)}%

            </p>


            <p>

                <strong>Grade</strong>

                ${grade}

            </p>


            <p>

                <strong>Status</strong>

                <span class="${status === "PASS" ? "pass" : "fail"}">

                    ${status}

                </span>

            </p>

        </div>


        <button
            class="print-btn"
            onclick="printResult()">

            🖨 Print Result

        </button>

    `;


    /* Scroll to result */

    document.getElementById("result")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================
   CLEAR FORM
===================================== */

function clearForm() {

    document.getElementById("studentName").value = "";

    document.getElementById("email").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("course").value = "";

    document.getElementById("htmlMarks").value = "";

    document.getElementById("cssMarks").value = "";

    document.getElementById("jsMarks").value = "";

    document.getElementById("pythonMarks").value = "";


    document.getElementById("extraSubjects").innerHTML = "";


    subjectCount = 0;


    document.getElementById("resultMessage").innerText =
        "Your result will appear here after generating.";


    document.getElementById("resultContent").innerHTML = "";

}


/* =====================================
   PRINT RESULT
===================================== */

function printResult() {

    window.print();

}