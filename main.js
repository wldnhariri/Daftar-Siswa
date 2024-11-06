// Tutup modal diluar konten
document.getElementById('confirmModal').addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        closeConfirmModal()
    }
})

document.getElementById('editModal').addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        closeEditModal()
    }
})

document.getElementById('deleteModal').addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        closeDeleteModal()
    }
})

// Method modal edit
let currentEditData = {};

const showConfirmEditModal = (id, name, kelas, major) => {
    currentEditData = { id, name, kelas, major };
    document.getElementById("editModal").style.display = "block";
};

const closeEditModal = () => {
    document.getElementById("editModal").style.display = "none";
    currentEditData = {};
};

const confirmEdit = () => {
    document.getElementById("name").value = currentEditData.name;
    document.getElementById("class").value = currentEditData.kelas;
    document.getElementById("major").value = currentEditData.major;

    document.getElementById("button").innerText = 'Ubah';
    document.getElementById("button").setAttribute('onclick', `updateData('${currentEditData.id}')`);
    closeEditModal();
};

// Method modal simpan
const inputs = document.querySelectorAll('#name, #class, #major')
const saveButton = document.getElementById('button')

inputs.forEach(input => {
    input.addEventListener('input', checkInputs)
    input.addEventListener('change', checkInputs)
})

function checkInputs() {
    const allFiled = Array.from(inputs).every(input => input.value.trim() !== '')
    const majorSelect = document.getElementById('major').value !== ''

    saveButton.disabled = !(allFiled && majorSelect)

    if (allFiled && majorSelect) {
        saveButton.style.backgroundColor = 'green'
        saveButton.style.color = 'white'

        saveButton.addEventListener('mouseover', () => {
            saveButton.style.backgroundColor = '#098a4e'
        })

        saveButton.addEventListener('mouseout', () => {
            saveButton.style.backgroundColor = 'green'
        })
    } else {
        saveButton.style.backgroundColor = '#e4ebf5'
        saveButton.style.color = '#b4c6da'
    }
}

const handleSaveClick = () => {
    if (!saveButton.disabled) {
        document.getElementById('confirmModal').style.display = 'block'
    }
}

const closeConfirmModal = () => {
    document.getElementById('confirmModal').style.display = 'none'
}

async function confirmSave() {
    const nameForm = document.getElementById(`name`).value.trim()
    const classForm = document.getElementById(`class`).value.trim()
    const majorForm = document.getElementById(`major`).value.trim()

    await axios.post(`http://localhost:3000/students`, {
        name: nameForm,
        class: classForm,
        major: majorForm
    })
        .then((response) => {
            console.log(response)
            getData()
            closeConfirmModal()
        })
        .catch((error) => {
            console.log(error.message)
        })
}

// Method update (ubah)
const showConfirmModal = () => {
    document.getElementById('confirmModal').style.display = 'block'
}

const checkUpdateInputs = () => {
    const nameForm = document.getElementById('name').value.trim()
    const classForm = document.getElementById('class').value.trim()
    const majorForm = document.getElementById('major').value.trim()

    return nameForm !== '' && classForm !== '' && majorForm !== ''
}

const updateData = async (id) => {
    if (checkUpdateInputs()) {
        showConfirmModal();

        document.getElementById('confirmButton').onclick = async () => {
            const nameForm = document.getElementById('name').value.trim();
            const classForm = document.getElementById('class').value.trim();
            const majorForm = document.getElementById('major').value.trim();

            try {
                const response = await axios.patch(`http://localhost:3000/students/${id}`, {
                    name: nameForm,
                    class: classForm,
                    major: majorForm
                });
                console.log(response);
                getData();
                closeConfirmModal();
            } catch (error) {
                console.log(error.message);
            }
        };
    } else {
        alert("Harap lengkapi semua input sebelum mengupdate data.");
    }
};

// Method modal delete
let currentDeleteId = null;

const showDeleteModal = (id) => {
    currentDeleteId = id
    document.getElementById("deleteModal").style.display = "block"
}

const closeDeleteModal = () => {
    document.getElementById("deleteModal").style.display = "none"
    currentDeleteId = null
}

const confirmDelete = async () => {
    if (currentDeleteId) {
        await axios.delete(`http://localhost:3000/students/${currentDeleteId}`)
            .then((response) => {
                console.log(response)
                getData()
            })
            .catch((error) => {
                console.log(error.message)
            })
        closeDeleteModal();
    }
}

const getData = async () => {
    await axios.get(`http://localhost:3000/students`)
        .then((response) => {
            let bucket = ``
            let students = response.data

            if (students.length > 0) {
                for (let i = 0; i < students.length; i++) {
                    bucket += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${students[i].name}</td>
                        <td>${students[i].class}</td>
                        <td>${students[i].major}</td>
                        <td>
                            <button class="btn-edit" onclick="showConfirmEditModal('${students[i].id}', '${students[i].name}', '${students[i].class}', '${students[i].major}')">edit</button>
                            <button class="btn-delete" onclick="showDeleteModal('${students[i].id}')">delete</button>
                        </td>
                    </tr>
                    `
                }
            } else {
                bucket += `
                    <tr>
                        <td colspan="5" style="text-align: center">Data tidak ditemukan</td>
                    </tr>
                `
            }
            document.getElementById(`result`).innerHTML = bucket
        })
        .catch((error) => {
            let bucket = `
            <tr>
                <td colspan="5" style="text-align: center">${error.message}</td>
            </tr>
            `
            document.getElementById(`result`).innerHTML = bucket
        })
}
getData()