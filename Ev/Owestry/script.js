function calculateResult() {
    const form = document.getElementById('quizForm');
    let totalScore = 0;
    let answeredQuestions = 0;
    const totalQuestions = 9;

    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = 'q' + i;
        const selectedOption = form.elements[questionName];

        if (selectedOption && selectedOption.value) {
            totalScore += parseInt(selectedOption.value, 10);
            answeredQuestions++;
        }
    }

    const resultDiv = document.getElementById('result');
    if (answeredQuestions > 0) {
        const finalResult = (totalScore / (5 * answeredQuestions)) * 100;
        resultDiv.innerHTML = 'Índice de discapacidad: ' + finalResult.toFixed(2) + '%';
    } else {
        resultDiv.innerHTML = 'Por favor, responde al menos una pregunta.';
    }
}

function exportToPdf() {
    const element = document.getElementById('quiz-container');
    const buttons = element.querySelectorAll('button');

    // Ocultar los botones antes de generar el PDF
    buttons.forEach(button => button.style.display = 'none');

    const opt = {
        margin:       0.2,
        filename:     'cuestionario-oswestry.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
        // Mostrar los botones de nuevo después de generar el PDF
        buttons.forEach(button => button.style.display = 'block');
    });
}
