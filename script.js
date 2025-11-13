document.addEventListener("DOMContentLoaded", function() {
    const sesionesContainer = document.getElementById('sesiones-container');
    const addSessionBtn = document.getElementById('add-session-btn');

    function updateSessionNumbers() {
        const sessionCards = document.querySelectorAll('.sesion-card');
        sessionCards.forEach((card, index) => {
            card.querySelector('.card-title').textContent = `Sesión ${index + 1}`;
        });
    }

    const canalesTbody = document.getElementById('canales-semicirculares-tbody');
    const addCanalRowBtn = document.getElementById('add-canal-row-btn');

    if (canalesTbody && addCanalRowBtn) {
        addCanalRowBtn.addEventListener('click', function() {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" class="form-control" name="canal_semicircular[]"></td>
                <td><input type="text" class="form-control" name="ng[]"></td>
                <td><input type="text" class="form-control" name="direccion[]"></td>
                <td><input type="text" class="form-control" name="duracion[]"></td>
                <td><button type="button" class="btn btn-danger btn-sm remove-canal-row-btn">Quitar</button></td>
            `;
            canalesTbody.appendChild(newRow);
        });

        canalesTbody.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-canal-row-btn')) {
                e.target.closest('tr').remove();
            }
        });
    }

    if (sesionesContainer) {
        sesionesContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-session-btn')) {
                e.target.closest('.sesion-card').remove();
                updateSessionNumbers();
            }
        });
    }

    if (addSessionBtn) {
        addSessionBtn.addEventListener('click', function() {
            const newSession = document.createElement('div');
            newSession.classList.add('card', 'sesion-card', 'mb-3');
            const newSessionNumber = document.querySelectorAll('.sesion-card').length + 1;
            newSession.innerHTML = `
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="card-title mb-0">Sesión ${newSessionNumber}</h6>
                        <button type="button" class="btn btn-danger btn-sm remove-session-btn">Quitar</button>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Fecha:</label>
                        <input type="date" class="form-control" name="sesion_fecha[]">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Evolución:</label>
                        <textarea class="form-control" name="sesion_evolucion[]" rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Tratamiento:</label>
                        <textarea class="form-control" name="sesion_tratamiento[]" rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Importar archivo (PNG o JPG):</label>
                        <input type="file" class="form-control" name="sesion_archivo[]" accept="image/png, image/jpeg">
                        <img src="" alt="Vista previa de la imagen" class="img-fluid mt-2 d-none" style="max-height: 200px;">
                    </div>
                </div>
            `;
            sesionesContainer.appendChild(newSession);
            updateSessionNumbers();
        });
    }

    function handleImagePreview(e) {
        // Check if the event target is a file input
        if (e.target.matches('input[type="file"]')) {
            const file = e.target.files[0];
            const img = e.target.nextElementSibling;

            // Ensure we have a file and an adjacent img tag
            if (file && img && img.tagName === 'IMG') {
                const reader = new FileReader();
                reader.onload = function(event) {
                    img.src = event.target.result;
                    img.classList.remove('d-none');
                };
                reader.readAsDataURL(file);
            }
        }
    }

    // Attach the single event listener to a common ancestor (e.g., the main container)
    // This uses event delegation to handle clicks from multiple file inputs.
    const mainContent = document.getElementById('myTabContent');
    if (mainContent) {
        mainContent.addEventListener('change', handleImagePreview);
    }
    // Also attach to the sessions container for dynamically added sessions
    if (sesionesContainer) {
        sesionesContainer.addEventListener('change', handleImagePreview);
    }

    const imagenesContainer = document.getElementById('imagenes-container');
    const addImagenBtn = document.getElementById('add-imagen-btn');

    function updateImageNumbers() {
        const imagenCards = document.querySelectorAll('.imagen-card');
        imagenCards.forEach((card, index) => {
            const groupNumber = index + 1;
            card.querySelector('.card-title').textContent = `Grupo de Imágenes ${groupNumber}`;
            // Update the name of the file inputs to match the new group number
            const fileInputs = card.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => {
                input.name = `imagen_archivo_${groupNumber}[]`;
            });
        });
    }

    if (addImagenBtn) {
        addImagenBtn.addEventListener('click', function() {
            const newImagen = document.createElement('div');
            newImagen.classList.add('card', 'imagen-card', 'mb-3');
            const newImagenNumber = document.querySelectorAll('.imagen-card').length + 1;
            newImagen.innerHTML = `
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="card-title mb-0">Grupo de Imágenes ${newImagenNumber}</h6>
                        <button type="button" class="btn btn-danger btn-sm remove-imagen-btn">Quitar Grupo</button>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción:</label>
                        <textarea class="form-control" name="imagen_descripcion[]" rows="2"></textarea>
                    </div>
                    <div class="image-files-container">
                        <div class="mb-3 image-file-entry">
                            <label class="form-label">Importar archivo (PNG o JPG):</label>
                            <div class="input-group">
                                <input type="file" class="form-control" name="imagen_archivo_${newImagenNumber}[]" accept="image/png, image/jpeg">
                                <button class="btn btn-danger btn-sm remove-image-file-btn" type="button">Quitar</button>
                            </div>
                            <img src="" alt="Vista previa de la imagen" class="img-fluid mt-2 d-none" style="max-height: 200px;">
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm add-image-file-btn mt-2">Agregar Archivo</button>
                </div>
            `;
            imagenesContainer.appendChild(newImagen);
            updateImageNumbers();
        });
    }

    if (imagenesContainer) {
        imagenesContainer.addEventListener('click', function(e) {
            // Handle removing a whole group
            if (e.target.classList.contains('remove-imagen-btn')) {
                e.target.closest('.imagen-card').remove();
                updateImageNumbers();
            }
            // Handle adding a new file input to a group
            if (e.target.classList.contains('add-image-file-btn')) {
                const card = e.target.closest('.imagen-card');
                const filesContainer = card.querySelector('.image-files-container');
                const groupNumber = Array.from(document.querySelectorAll('.imagen-card')).indexOf(card) + 1;

                const newFileEntry = document.createElement('div');
                newFileEntry.classList.add('mb-3', 'image-file-entry');
                newFileEntry.innerHTML = `
                    <label class="form-label">Importar archivo (PNG o JPG):</label>
                    <div class="input-group">
                        <input type="file" class="form-control" name="imagen_archivo_${groupNumber}[]" accept="image/png, image/jpeg">
                        <button class="btn btn-danger btn-sm remove-image-file-btn" type="button">Quitar</button>
                    </div>
                    <img src="" alt="Vista previa de la imagen" class="img-fluid mt-2 d-none" style="max-height: 200px;">
                `;
                filesContainer.appendChild(newFileEntry);
            }
            // Handle removing a single file input
            if (e.target.classList.contains('remove-image-file-btn')) {
                const fileEntry = e.target.closest('.image-file-entry');
                const filesContainer = fileEntry.parentElement;
                // Prevent removing the last file input
                if (filesContainer.querySelectorAll('.image-file-entry').length > 1) {
                    fileEntry.remove();
                } else {
                    alert("No se puede quitar el único archivo. Para eliminar todo, use 'Quitar Grupo'.");
                }
            }
        });

        imagenesContainer.addEventListener('change', handleImagePreview);
    }

    const descripcionDolorImagenesContainer = document.getElementById('descripcion-dolor-imagenes-container');
    const addDescripcionDolorImagenBtn = document.getElementById('add-descripcion-dolor-imagen-btn');

    function setupImageUploader(container, addButton, cardClass, titlePrefix) {
        function updateNumbers() {
            const cards = container.querySelectorAll(`.${cardClass}`);
            cards.forEach((card, index) => {
                card.querySelector('.card-title').textContent = `${titlePrefix} ${index + 1}`;
            });
        }

        container.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-imagen-btn')) {
                e.target.closest(`.${cardClass}`).remove();
                updateNumbers();
            }
        });

        addButton.addEventListener('click', function() {
            const newImage = document.createElement('div');
            newImage.classList.add('card', cardClass, 'mb-3');
            const newNumber = container.querySelectorAll(`.${cardClass}`).length + 1;
            newImage.innerHTML = `
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="card-title mb-0">${titlePrefix} ${newNumber}</h6>
                        <button type="button" class="btn btn-danger btn-sm remove-imagen-btn">Quitar</button>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Importar archivo (PNG o JPG):</label>
                        <input type="file" class="form-control" name="${cardClass}_archivo[]" accept="image/png, image/jpeg">
                        <img src="" alt="Vista previa de la imagen" class="img-fluid mt-2 d-none" style="max-height: 300px;">
                    </div>
                </div>
            `;
            container.appendChild(newImage);
            updateNumbers();
        });

        container.addEventListener('change', handleImagePreview);
    }
    if (descripcionDolorImagenesContainer && addDescripcionDolorImagenBtn) {
        setupImageUploader(descripcionDolorImagenesContainer, addDescripcionDolorImagenBtn, 'descripcion-dolor-imagen-card', 'Imagen');
    }

    // Recibe la imagen del mapa de dolor desde el iframe y la agrega automáticamente
    window.addEventListener('message', function(event) {
        const data = event.data;
        if (data && data.type === 'MAPA_DOLOR_IMAGE' && data.dataUrl) {
            if (descripcionDolorImagenesContainer) {
                const newImage = document.createElement('div');
                newImage.classList.add('card', 'descripcion-dolor-imagen-card', 'mb-3');
                const newNumber = descripcionDolorImagenesContainer.querySelectorAll('.descripcion-dolor-imagen-card').length + 1;
                newImage.innerHTML = `
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="card-title mb-0">Imagen ${newNumber}</h6>
                            <button type="button" class="btn btn-danger btn-sm remove-imagen-btn">Quitar</button>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Importar archivo (PNG o JPG):</label>
                            <input type="file" class="form-control" name="descripcion-dolor-imagen-card_archivo[]" accept="image/png, image/jpeg">
                            <img src="${data.dataUrl}" alt="Vista previa de la imagen" class="img-fluid mt-2" style="max-height: 300px;">
                        </div>
                    </div>
                `;
                descripcionDolorImagenesContainer.appendChild(newImage);
            }
        }
    });

    const evaluacionFuncionalImagenesContainer = document.getElementById('evaluacion-funcional-imagenes-container');
    const addEvaluacionFuncionalImagenBtn = document.getElementById('add-evaluacion-funcional-imagen-btn');
    if (evaluacionFuncionalImagenesContainer && addEvaluacionFuncionalImagenBtn) {
        setupImageUploader(evaluacionFuncionalImagenesContainer, addEvaluacionFuncionalImagenBtn, 'evaluacion-funcional-imagen-card', 'Imagen');
    }

    // Plantillas ortopédicas: Inspección visual y Huella plantar
    const inspeccionVisualImagenesContainer = document.getElementById('inspeccion-visual-imagenes-container');
    const addInspeccionVisualImagenBtn = document.getElementById('add-inspeccion-visual-imagen-btn');
    if (inspeccionVisualImagenesContainer && addInspeccionVisualImagenBtn) {
        setupImageUploader(inspeccionVisualImagenesContainer, addInspeccionVisualImagenBtn, 'inspeccion-visual-imagen-card', 'Imagen');
    }

    const huellaPlantarImagenesContainer = document.getElementById('huella-plantar-imagenes-container');
    const addHuellaPlantarImagenBtn = document.getElementById('add-huella-plantar-imagen-btn');
    if (huellaPlantarImagenesContainer && addHuellaPlantarImagenBtn) {
        setupImageUploader(huellaPlantarImagenesContainer, addHuellaPlantarImagenBtn, 'huella-plantar-imagen-card', 'Imagen');
    }

    // Modal y apertura de Cuestionarios funcionales
    const cuestionarioModalEl = document.getElementById('cuestionarioModal');
    let cuestionarioModal;
    if (cuestionarioModalEl) {
        cuestionarioModal = new bootstrap.Modal(cuestionarioModalEl);
    }
    const cuestionarioIframe = document.getElementById('cuestionarioIframe');
    const openNdiBtn = document.getElementById('open-ndi-btn');
    const openOwestryBtn = document.getElementById('open-owestry-btn');
    const openQuickdashBtn = document.getElementById('open-quickdash-btn');
    const openLefsBtn = document.getElementById('open-lefs-btn');

    function openCuestionario(path) {
        if (cuestionarioIframe && cuestionarioModal) {
            cuestionarioIframe.src = path;
            cuestionarioModal.show();
        }
    }

    if (openNdiBtn) openNdiBtn.addEventListener('click', () => openCuestionario('Ev/NDI/index.html'));
    if (openOwestryBtn) openOwestryBtn.addEventListener('click', () => openCuestionario('Ev/Owestry/index.html'));
    if (openQuickdashBtn) openQuickdashBtn.addEventListener('click', () => openCuestionario('Ev/QuickDash/index.html'));
    if (openLefsBtn) openLefsBtn.addEventListener('click', () => openCuestionario('Ev/LEFS/index.html'));

    // Cargador de PDFs para Cuestionarios funcionales
    const cuestionariosPdfContainer = document.getElementById('cuestionarios-pdf-container');
    const addCuestionarioPdfBtn = document.getElementById('add-cuestionario-pdf-btn');

    function updatePdfNumbers() {
        if (!cuestionariosPdfContainer) return;
        const cards = cuestionariosPdfContainer.querySelectorAll('.cuestionario-pdf-card');
        cards.forEach((card, index) => {
            const numEl = card.querySelector('.pdf-number');
            if (numEl) numEl.textContent = index + 1;
        });
    }

    function addPdfCard() {
        if (!cuestionariosPdfContainer) return;
        const card = document.createElement('div');
        card.classList.add('card', 'cuestionario-pdf-card', 'mb-2');
        const number = (cuestionariosPdfContainer.querySelectorAll('.cuestionario-pdf-card').length || 0) + 1;
        card.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="card-title mb-0">PDF <span class="pdf-number">${number}</span></h6>
                    <button type="button" class="btn btn-danger btn-sm remove-pdf-btn">Quitar</button>
                </div>
                <div class="mb-2">
                    <label class="form-label">Importar archivo (PDF):</label>
                    <input type="file" class="form-control" name="cuestionario_pdf[]" accept="application/pdf">
                </div>
                <div class="mt-2">
                    <a href="" target="_blank" class="pdf-preview-link d-none">Ver PDF</a>
                </div>
            </div>
        `;
        cuestionariosPdfContainer.appendChild(card);
        updatePdfNumbers();
    }

    if (addCuestionarioPdfBtn && cuestionariosPdfContainer) {
        addCuestionarioPdfBtn.addEventListener('click', addPdfCard);
        // Crear una tarjeta inicial para guiar al usuario
        addPdfCard();

        cuestionariosPdfContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-pdf-btn')) {
                const card = e.target.closest('.cuestionario-pdf-card');
                if (card) {
                    card.remove();
                    updatePdfNumbers();
                }
            }
        });

        cuestionariosPdfContainer.addEventListener('change', function(e) {
            if (e.target && e.target.matches('input[type="file"][accept="application/pdf"]')) {
                const input = e.target;
                const file = input.files && input.files[0];
                const card = input.closest('.cuestionario-pdf-card');
                const link = card ? card.querySelector('.pdf-preview-link') : null;
                if (file && link) {
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        const dataUrl = evt.target.result;
                        link.href = dataUrl;
                        link.classList.remove('d-none');
                        link.textContent = 'Ver PDF';
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    }

    const fechaNacimientoInput = document.getElementById('fecha_nacimiento');
    const edadInput = document.getElementById('edad');

    if (fechaNacimientoInput) {
        fechaNacimientoInput.addEventListener('change', function() {
            if (this.value) {
                const birthDate = new Date(this.value);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                edadInput.value = age;
            }
        });
    }

    const confirmarDolorBtn = document.getElementById('confirmar-dolor-btn');
    const dolorSlider = document.getElementById('dolor-slider');
    const dolorSeleccionado = document.getElementById('dolor-seleccionado');
    const evaNumericaInput = document.getElementById('eva-numerica-input');

    if (confirmarDolorBtn) {
        confirmarDolorBtn.addEventListener('click', function() {
            const formattedValue = parseFloat(dolorSlider.value).toFixed(1);
            dolorSeleccionado.textContent = `${formattedValue} cm`;
            dolorSeleccionado.classList.remove('d-none');
            // La escala numérica es independiente; no actualizamos su campo aquí
        });
    }

    // La escala numérica 0-10 funciona de forma independiente del slider EVA

    function resetNuevaFicha() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => form.reset());

        // Clear the selected pain level display
        if (dolorSeleccionado) {
            dolorSeleccionado.textContent = '';
            dolorSeleccionado.classList.add('d-none');
        }
        if (evaNumericaInput) {
            evaNumericaInput.value = '';
        }

        // Remove all but the first treatment session
        const allSessions = sesionesContainer.querySelectorAll('.sesion-card');
        for (let i = allSessions.length - 1; i > 0; i--) {
            allSessions[i].remove();
        }
        updateSessionNumbers();

        // Reset image groups to a single group with a single file input
        const allImageGroups = imagenesContainer.querySelectorAll('.imagen-card');
        allImageGroups.forEach((group, index) => {
            if (index > 0) {
                group.remove();
            } else {
                // For the first group, remove all but the first file input
                const fileEntries = group.querySelectorAll('.image-file-entry');
                fileEntries.forEach((entry, fileIndex) => {
                    if (fileIndex > 0) {
                        entry.remove();
                    }
                });
            }
        });
        updateImageNumbers();
        
        // Limpiar PDFs y resultado de Cuestionarios funcionales
        const cuestionariosPdfContainerReset = document.getElementById('cuestionarios-pdf-container');
        const cuestionarioResultadoReset = document.getElementById('cuestionario_resultado');
        if (cuestionariosPdfContainerReset) {
            cuestionariosPdfContainerReset.querySelectorAll('.cuestionario-pdf-card').forEach(card => card.remove());
        }
        if (cuestionarioResultadoReset) {
            cuestionarioResultadoReset.value = '';
        }

        // Limpiar imágenes de Plantillas ortopédicas
        const inspeccionVisualContainerReset = document.getElementById('inspeccion-visual-imagenes-container');
        if (inspeccionVisualContainerReset) {
            inspeccionVisualContainerReset.querySelectorAll('.inspeccion-visual-imagen-card').forEach(card => card.remove());
        }
        const huellaPlantarContainerReset = document.getElementById('huella-plantar-imagenes-container');
        if (huellaPlantarContainerReset) {
            huellaPlantarContainerReset.querySelectorAll('.huella-plantar-imagen-card').forEach(card => card.remove());
        }
    }

    const nuevaFichaBtn = document.getElementById('nueva-ficha-btn');
    const confirmNuevaFichaBtn = document.getElementById('confirmNuevaFichaBtn');
    const confirmNuevaFichaModalEl = document.getElementById('confirmNuevaFichaModal');
    let confirmNuevaFichaModal;
    if (confirmNuevaFichaModalEl) {
        confirmNuevaFichaModal = new bootstrap.Modal(confirmNuevaFichaModalEl);
    }

    if (nuevaFichaBtn && confirmNuevaFichaModal) {
        nuevaFichaBtn.addEventListener('click', function() {
            confirmNuevaFichaModal.show();
        });
    }

    if (confirmNuevaFichaBtn && confirmNuevaFichaModal) {
        confirmNuevaFichaBtn.addEventListener('click', function() {
            resetNuevaFicha();
            confirmNuevaFichaModal.hide();
        });
    }

    const exportarJsonBtn = document.getElementById('exportar-json-btn');
    if (exportarJsonBtn) {
        exportarJsonBtn.addEventListener('click', exportToJson);
    }

    const importarJsonBtn = document.getElementById('importar-json-btn');
    if (importarJsonBtn) {
        importarJsonBtn.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json';
            fileInput.onchange = e => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        try {
                            const data = JSON.parse(event.target.result);
                            importFromJson(data);
                        } catch (error) {
                            console.error("Error parsing JSON file:", error);
                            alert("El archivo seleccionado no es un JSON válido.");
                        }
                    };
                    reader.readAsText(file);
                }
            };
            fileInput.click();
        });
    }

    function importFromJson(data) {
        // Limpiar la ficha sin mostrar el modal de confirmación (solo para importar)
        resetNuevaFicha();

        // Populate simple fields
        for (const section in data) {
            if (section !== 'tratamiento') {
                for (const id in data[section]) {
                    const el = document.getElementById(id);
                    if (el) {
                        if (el.type === 'checkbox') {
                            el.checked = data[section][id];
                        } else {
                            el.value = data[section][id];
                        }
                    }
                }
            }
        }

        // Handle EVA display
        const dolorSeleccionado = document.getElementById('dolor-seleccionado');
        if (data.exploracionGeneral['dolor-seleccionado']) {
            dolorSeleccionado.textContent = data.exploracionGeneral['dolor-seleccionado'];
            dolorSeleccionado.classList.remove('d-none');
        }

        // Handle Inspeccion image display
        const inspeccionImg = document.querySelector('#inspeccion_archivo + img');
        if (data.exploracionGeneral['inspeccion_imagen'] && data.exploracionGeneral['inspeccion_imagen'].startsWith('data:image')) {
            inspeccionImg.src = data.exploracionGeneral['inspeccion_imagen'];
            inspeccionImg.classList.remove('d-none');
        }

        // Handle AROM image display
        const aromImg = document.querySelector('#arom_archivo + img');
        if (data.exploracionAnalitica['arom_imagen'] && data.exploracionAnalitica['arom_imagen'].startsWith('data:image')) {
            aromImg.src = data.exploracionAnalitica['arom_imagen'];
            aromImg.classList.remove('d-none');
        }

        // Handle PROM image display
        const promImg = document.querySelector('#prom_archivo + img');
        if (data.exploracionAnalitica['prom_imagen'] && data.exploracionAnalitica['prom_imagen'].startsWith('data:image')) {
            promImg.src = data.exploracionAnalitica['prom_imagen'];
            promImg.classList.remove('d-none');
        }


        // Populate tratamiento goals
        document.getElementById('objetivo_general').value = data.tratamiento.objetivoGeneral;
        document.getElementById('objetivos_especificos').value = data.tratamiento.objetivosEspecificos;

        // Recreate sessions
        const sesiones = data.tratamiento.sesiones || [];
        const allSessionCards = sesionesContainer.querySelectorAll('.sesion-card');

        // Remove all sessions to start fresh
        allSessionCards.forEach(card => card.remove());

        if (sesiones.length === 0) {
            addSessionBtn.click(); // Add one empty session if there are none in the JSON
        } else {
            sesiones.forEach((sesionData, index) => {
                addSessionBtn.click();
                const newCard = sesionesContainer.querySelector('.sesion-card:last-child');
                if (newCard) {
                    newCard.querySelector('input[name="sesion_fecha[]"]').value = sesionData.fecha;
                    newCard.querySelector('textarea[name="sesion_evolucion[]"]').value = sesionData.evolucion;
                    newCard.querySelector('textarea[name="sesion_tratamiento[]"]').value = sesionData.tratamiento;
                    const img = newCard.querySelector('img');
                    if (sesionData.imagen && sesionData.imagen.startsWith('data:image')) {
                        img.src = sesionData.imagen;
                        img.classList.remove('d-none');
                    }
                }
            });
        }
        updateSessionNumbers();

        // Recreate image groups for "Imagenología"
        const imagenGroups = data.imagenologia ? data.imagenologia.imagenes || [] : [];
        const allImageCards = imagenesContainer.querySelectorAll('.imagen-card');
        allImageCards.forEach(card => card.remove());

        if (imagenGroups.length > 0) {
            imagenGroups.forEach((groupData) => {
                addImagenBtn.click(); // This creates a new group with one empty file input
                const newCard = imagenesContainer.querySelector('.imagen-card:last-child');
                if (newCard) {
                    newCard.querySelector('textarea[name="imagen_descripcion[]"]').value = groupData.descripcion;
                    const filesContainer = newCard.querySelector('.image-files-container');
                    const fileEntries = filesContainer.querySelectorAll('.image-file-entry');

                    // Remove the default empty file input
                    fileEntries.forEach(entry => entry.remove());

                    const groupNumber = Array.from(document.querySelectorAll('.imagen-card')).indexOf(newCard) + 1;

                    if (groupData.imagenes && groupData.imagenes.length > 0) {
                        groupData.imagenes.forEach(imgSrc => {
                            const newFileEntry = document.createElement('div');
                            newFileEntry.classList.add('mb-3', 'image-file-entry');
                            newFileEntry.innerHTML = `
                                <label class="form-label">Importar archivo (PNG o JPG):</label>
                                <div class="input-group">
                                    <input type="file" class="form-control" name="imagen_archivo_${groupNumber}[]" accept="image/png, image/jpeg">
                                    <button class="btn btn-danger btn-sm remove-image-file-btn" type="button">Quitar</button>
                                </div>
                                <img src="${imgSrc}" alt="Vista previa de la imagen" class="img-fluid mt-2" style="max-height: 200px;">
                            `;
                            filesContainer.appendChild(newFileEntry);
                        });
                    } else {
                        // If there are no images, add one empty file input
                        const newFileEntry = document.createElement('div');
                        newFileEntry.classList.add('mb-3', 'image-file-entry');
                        newFileEntry.innerHTML = `
                            <label class="form-label">Importar archivo (PNG o JPG):</label>
                            <div class="input-group">
                                <input type="file" class="form-control" name="imagen_archivo_${groupNumber}[]" accept="image/png, image/jpeg">
                                <button class="btn btn-danger btn-sm remove-image-file-btn" type="button">Quitar</button>
                            </div>
                            <img src="" alt="Vista previa de la imagen" class="img-fluid mt-2 d-none" style="max-height: 200px;">
                        `;
                        filesContainer.appendChild(newFileEntry);
                    }
                }
            });
        }
        updateImageNumbers();

        // Recreate images for "Descripción del dolor"
        const descripcionDolorImagenes = data.exploracionGeneral.descripcionDolorImagenes || [];
        const allDescripcionDolorImageCards = descripcionDolorImagenesContainer.querySelectorAll('.descripcion-dolor-imagen-card');
        allDescripcionDolorImageCards.forEach(card => card.remove());
        if (descripcionDolorImagenes.length > 0) {
            descripcionDolorImagenes.forEach((imagenData) => {
                addDescripcionDolorImagenBtn.click();
                const newCard = descripcionDolorImagenesContainer.querySelector('.descripcion-dolor-imagen-card:last-child');
                if (newCard) {
                    const img = newCard.querySelector('img');
                    if (imagenData.imagen && imagenData.imagen.startsWith('data:image')) {
                        img.src = imagenData.imagen;
                        img.classList.remove('d-none');
                    }
                }
            });
        }

        // Recreate canal semicircular rows
        const canalesData = data.exploracionVestibular ? data.exploracionVestibular.canalesSemicirculares || [] : [];
        const canalesTbody = document.getElementById('canales-semicirculares-tbody');
        canalesTbody.innerHTML = ''; // Clear existing rows

        if (canalesData.length > 0) {
            canalesData.forEach(canalData => {
                addCanalRowBtn.click();
                const newRow = canalesTbody.querySelector('tr:last-child');
                if (newRow) {
                    newRow.querySelector('input[name="canal_semicircular[]"]').value = canalData.canal;
                    newRow.querySelector('input[name="ng[]"]').value = canalData.ng;
                    newRow.querySelector('input[name="direccion[]"]').value = canalData.direccion;
                    newRow.querySelector('input[name="duracion[]"]').value = canalData.duracion;
                }
            });
        }
        // Recreate images for "Evaluación funcional"
        const evaluacionFuncionalImagenes = data.exploracionGeneral.evaluacionFuncionalImagenes || [];
        const allEvaluacionFuncionalImageCards = evaluacionFuncionalImagenesContainer.querySelectorAll('.evaluacion-funcional-imagen-card');
        allEvaluacionFuncionalImageCards.forEach(card => card.remove());
        if (evaluacionFuncionalImagenes.length > 0) {
            evaluacionFuncionalImagenes.forEach((imagenData) => {
                addEvaluacionFuncionalImagenBtn.click();
                const newCard = evaluacionFuncionalImagenesContainer.querySelector('.evaluacion-funcional-imagen-card:last-child');
                if (newCard) {
                    const img = newCard.querySelector('img');
                    if (imagenData.imagen && imagenData.imagen.startsWith('data:image')) {
                        img.src = imagenData.imagen;
                        img.classList.remove('d-none');
                    }
                }
            });
        }

        // Recreate PDFs y resultado de Cuestionarios funcionales
        const cuestionariosData = (data.exploracionGeneral && data.exploracionGeneral.cuestionariosFuncionales) ? data.exploracionGeneral.cuestionariosFuncionales : { pdfs: [], resultado: '' };
        const resultadoEl = document.getElementById('cuestionario_resultado');
        if (resultadoEl) {
            resultadoEl.value = cuestionariosData.resultado || '';
        }
        if (cuestionariosPdfContainer && addCuestionarioPdfBtn) {
            // Limpiar tarjetas existentes
            cuestionariosPdfContainer.querySelectorAll('.cuestionario-pdf-card').forEach(card => card.remove());
            if (cuestionariosData.pdfs && cuestionariosData.pdfs.length > 0) {
                cuestionariosData.pdfs.forEach((pdfUrl) => {
                    addCuestionarioPdfBtn.click();
                    const newCard = cuestionariosPdfContainer.querySelector('.cuestionario-pdf-card:last-child');
                    const link = newCard ? newCard.querySelector('.pdf-preview-link') : null;
                    if (link) {
                        link.href = pdfUrl;
                        link.classList.remove('d-none');
                        link.textContent = 'Ver PDF';
                    }
                });
            } else {
                // Crear al menos una tarjeta vacía
                addCuestionarioPdfBtn.click();
            }
        }

        // Recreate images for Plantillas ortopédicas
        const plantillasData = data.plantillasOrtopedicas ? data.plantillasOrtopedicas : { inspeccionVisualImagenes: [], huellaPlantarImagenes: [] };
        // Inspección visual
        if (inspeccionVisualImagenesContainer && addInspeccionVisualImagenBtn) {
            inspeccionVisualImagenesContainer.querySelectorAll('.inspeccion-visual-imagen-card').forEach(card => card.remove());
            if (plantillasData.inspeccionVisualImagenes && plantillasData.inspeccionVisualImagenes.length > 0) {
                plantillasData.inspeccionVisualImagenes.forEach((imagenData) => {
                    addInspeccionVisualImagenBtn.click();
                    const newCard = inspeccionVisualImagenesContainer.querySelector('.inspeccion-visual-imagen-card:last-child');
                    if (newCard) {
                        const img = newCard.querySelector('img');
                        if (imagenData.imagen && imagenData.imagen.startsWith('data:image')) {
                            img.src = imagenData.imagen;
                            img.classList.remove('d-none');
                        }
                    }
                });
            }
        }
        // Huella plantar
        if (huellaPlantarImagenesContainer && addHuellaPlantarImagenBtn) {
            huellaPlantarImagenesContainer.querySelectorAll('.huella-plantar-imagen-card').forEach(card => card.remove());
            if (plantillasData.huellaPlantarImagenes && plantillasData.huellaPlantarImagenes.length > 0) {
                plantillasData.huellaPlantarImagenes.forEach((imagenData) => {
                    addHuellaPlantarImagenBtn.click();
                    const newCard = huellaPlantarImagenesContainer.querySelector('.huella-plantar-imagen-card:last-child');
                    if (newCard) {
                        const img = newCard.querySelector('img');
                        if (imagenData.imagen && imagenData.imagen.startsWith('data:image')) {
                            img.src = imagenData.imagen;
                            img.classList.remove('d-none');
                        }
                    }
                });
            }
        }
    }

    function exportToJson() {
        const data = {
            datosPersonales: {},
            anamnesisRemota: {},
            exploracionGeneral: {},
            exploracionAnalitica: {},
            exploracionVestibular: {
                canalesSemicirculares: []
            },
            imagenologia: {
                imagenes: []
            },
            plantillasOrtopedicas: {
                inspeccionVisualImagenes: [],
                huellaPlantarImagenes: []
            },
            tratamiento: {
                objetivoGeneral: '',
                objetivosEspecificos: '',
                sesiones: []
            }
        };

        // Gather data from all form elements
        document.querySelectorAll('input, textarea').forEach(el => {
            const section = el.closest('.tab-pane').id;
            const id = el.id;
            if (!id) return;

            switch(section) {
                case 'datos-personales':
                    data.datosPersonales[id] = el.type === 'checkbox' ? el.checked : el.value;
                    break;
                case 'anamnesis-remota':
                    data.anamnesisRemota[id] = el.type === 'checkbox' ? el.checked : el.value;
                    break;
                case 'exploracion-general':
                    data.exploracionGeneral[id] = el.type === 'checkbox' ? el.checked : el.value;
                    break;
                case 'exploracion-analitica':
                    data.exploracionAnalitica[id] = el.type === 'checkbox' ? el.checked : el.value;
                    break;
                case 'exploracion-vestibular':
                    if (!data.exploracionVestibular[id]) { // Check to avoid overwriting table data
                        data.exploracionVestibular[id] = el.value;
                    }
                    break;
                case 'plantillas-ortopedicas':
                    if (!data.plantillasOrtopedicas[id]) {
                        data.plantillasOrtopedicas[id] = el.type === 'checkbox' ? el.checked : el.value;
                    }
                    break;
                case 'tratamiento':
                    if (id === 'objetivo_general') data.tratamiento.objetivoGeneral = el.value;
                    if (id === 'objetivos_especificos') data.tratamiento.objetivosEspecificos = el.value;
                    break;
            }
        });

        // Handle EVA separately
        data.exploracionGeneral['dolor-seleccionado'] = document.getElementById('dolor-seleccionado').textContent;

        // Handle Inspeccion image
        const inspeccionImg = document.querySelector('#inspeccion_archivo + img');
        if (inspeccionImg && inspeccionImg.src.startsWith('data:image')) {
            data.exploracionGeneral['inspeccion_imagen'] = inspeccionImg.src;
        } else {
            data.exploracionGeneral['inspeccion_imagen'] = '';
        }

        // Handle AROM image
        const aromImg = document.querySelector('#arom_archivo + img');
        if (aromImg && aromImg.src.startsWith('data:image')) {
            data.exploracionAnalitica['arom_imagen'] = aromImg.src;
        } else {
            data.exploracionAnalitica['arom_imagen'] = '';
        }

        // Handle PROM image
        const promImg = document.querySelector('#prom_archivo + img');
        if (promImg && promImg.src.startsWith('data:image')) {
            data.exploracionAnalitica['prom_imagen'] = promImg.src;
        } else {
            data.exploracionAnalitica['prom_imagen'] = '';
        }

        // Gather session data
        document.querySelectorAll('.sesion-card').forEach(card => {
            const sesion = {
                fecha: card.querySelector('input[name="sesion_fecha[]"]').value,
                evolucion: card.querySelector('textarea[name="sesion_evolucion[]"]').value,
                tratamiento: card.querySelector('textarea[name="sesion_tratamiento[]"]').value,
                imagen: card.querySelector('img').src,
            };
            data.tratamiento.sesiones.push(sesion);
        });

        // Gather image data for "Imagenología"
        document.querySelectorAll('#imagenes-container .imagen-card').forEach(card => {
            const group = {
                descripcion: card.querySelector('textarea[name="imagen_descripcion[]"]').value,
                imagenes: []
            };
            card.querySelectorAll('.image-file-entry img').forEach(img => {
                if (img.src && img.src.startsWith('data:image')) {
                    group.imagenes.push(img.src);
                }
            });
            data.imagenologia.imagenes.push(group);
        });

        // Gather image data for "Descripción del dolor"
        data.exploracionGeneral.descripcionDolorImagenes = [];
        document.querySelectorAll('#descripcion-dolor-imagenes-container .descripcion-dolor-imagen-card').forEach(card => {
            const imagen = {
                imagen: card.querySelector('img').src,
            };
            data.exploracionGeneral.descripcionDolorImagenes.push(imagen);
        });

        // Gather image data for "Evaluación funcional"
        data.exploracionGeneral.evaluacionFuncionalImagenes = [];
        document.querySelectorAll('#evaluacion-funcional-imagenes-container .evaluacion-funcional-imagen-card').forEach(card => {
            const imagen = {
                imagen: card.querySelector('img').src,
            };
            data.exploracionGeneral.evaluacionFuncionalImagenes.push(imagen);
        });

        // Gather image data for Plantillas ortopédicas
        // Inspección visual
        document.querySelectorAll('#inspeccion-visual-imagenes-container .inspeccion-visual-imagen-card').forEach(card => {
            const imagen = { imagen: card.querySelector('img').src };
            data.plantillasOrtopedicas.inspeccionVisualImagenes.push(imagen);
        });
        // Huella plantar
        document.querySelectorAll('#huella-plantar-imagenes-container .huella-plantar-imagen-card').forEach(card => {
            const imagen = { imagen: card.querySelector('img').src };
            data.plantillasOrtopedicas.huellaPlantarImagenes.push(imagen);
        });

        // Gather PDFs y resultado de "Cuestionarios funcionales"
        const cuestionarioResultadoEl = document.getElementById('cuestionario_resultado');
        data.exploracionGeneral.cuestionariosFuncionales = { pdfs: [], resultado: '' };
        if (cuestionarioResultadoEl) {
            data.exploracionGeneral.cuestionariosFuncionales.resultado = cuestionarioResultadoEl.value;
        }
        document.querySelectorAll('#cuestionarios-pdf-container .cuestionario-pdf-card .pdf-preview-link').forEach(link => {
            if (link.href && link.href.startsWith('data:application/pdf')) {
                data.exploracionGeneral.cuestionariosFuncionales.pdfs.push(link.href);
            }
        });

        // Gather canal semicircular data
        document.querySelectorAll('#canales-semicirculares-tbody tr').forEach(row => {
            const canal = {
                canal: row.querySelector('input[name="canal_semicircular[]"]').value,
                ng: row.querySelector('input[name="ng[]"]').value,
                direccion: row.querySelector('input[name="direccion[]"]').value,
                duracion: row.querySelector('input[name="duracion[]"]').value,
            };
            data.exploracionVestibular.canalesSemicirculares.push(canal);
        });

        const nombre = data.datosPersonales.nombre || "sin-nombre";
        const fecha = new Date().toISOString().slice(0, 10);
        const filename = `ficha-clinica-${nombre}-${fecha}.json`;

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    const controlMedicoSiRadio = document.getElementById('control_medico_si');
    const controlMedicoNoRadio = document.getElementById('control_medico_no');
    const controlMedicoDetalles = document.getElementById('control_medico_detalles');

    if (controlMedicoSiRadio && controlMedicoNoRadio && controlMedicoDetalles) {
        controlMedicoSiRadio.addEventListener('change', function() {
            if (this.checked) {
                controlMedicoDetalles.classList.remove('d-none');
            }
        });

        controlMedicoNoRadio.addEventListener('change', function() {
            if (this.checked) {
                controlMedicoDetalles.classList.add('d-none');
            }
        });
    }

    function setupPseq() {
        const pseqInputs = document.querySelectorAll('input[name^="pseq_"]');
        const pseqTotal = document.getElementById('pseq_total');
        const pseqResetBtn = document.getElementById('pseq_reset_btn');

        if (!pseqTotal || pseqInputs.length === 0) return;

        function calculatePseqTotal() {
            let total = 0;
            for (let i = 1; i <= 10; i++) {
                const selected = document.querySelector(`input[name="pseq_${i}"]:checked`);
                if (selected) {
                    total += parseInt(selected.value, 10);
                }
            }
            pseqTotal.value = total;
        }

        pseqInputs.forEach(input => {
            input.addEventListener('change', calculatePseqTotal);
        });

        if (pseqResetBtn) {
            pseqResetBtn.addEventListener('click', () => {
                pseqInputs.forEach(input => {
                    input.checked = false;
                });
                calculatePseqTotal(); // Recalculate to set total to 0
            });
        }
    }

    setupPseq();
});
