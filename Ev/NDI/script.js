document.getElementById('calculate-btn').addEventListener('click', () => {
    const form = document.getElementById('ndi-form');
    let totalScore = 0;
    let unansweredQuestions = [];

    for (let i = 1; i <= 10; i++) {
        const questionName = `q${i}`;
        const selectedOption = form.querySelector(`input[name="${questionName}"]:checked`);

        if (selectedOption) {
            totalScore += parseInt(selectedOption.value);
        } else {
            unansweredQuestions.push(i);
        }
    }

    if (unansweredQuestions.length > 0) {
        alert(`Por favor, responda las siguientes preguntas: ${unansweredQuestions.join(', ')}`);
        return;
    }

    const disabilityIndex = (totalScore / 50) * 100;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Índice de discapacidad cervical: ${disabilityIndex.toFixed(2)}%`;
});

document.getElementById('export-btn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const element = document.querySelector('.container');

    html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Margen de 10mm a cada lado
        const pdfHeight = pdf.internal.pageSize.getHeight() - 20; // Margen de 10mm arriba y abajo

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;

        const imgWidth = pdfWidth;
        const imgHeight = imgWidth / ratio;

        let heightLeft = imgHeight;
        let position = 10; // Posición inicial con margen superior

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight + 10; // Mover a la siguiente sección de la imagen
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save('Índice-de-discapacidad-de-cuello.pdf');
    });
});
