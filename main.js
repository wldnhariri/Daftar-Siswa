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
const showSimpanModal = () => {
    document.getElementById("simpanModal").style.display = "block";
}

const closeSimpanModal = () => {
    document.getElementById("simpanModal").style.display = "none";
}

const updateData = async (id) => {
    let nameForm = document.getElementById(`name`).value
    let classForm = document.getElementById(`class`).value
    let majorForm = document.getElementById(`major`).value

    if (nameForm === '' || classForm === '' || majorForm === '') {
        showSimpanModal();
        return;
    }

    await axios.patch(`http://localhost:3000/students/${id}`, {
        name: nameForm,
        class: classForm,
        major: majorForm
    })
        .then((response) => {
            console.log(response)
            getData();
        })
        .catch((error) => {
            console.log(error.message)
        })
}

const saveData = async () => {
    let nameForm = document.getElementById(`name`).value.trim()
    let classForm = document.getElementById(`class`).value.trim()
    let majorForm = document.getElementById(`major`).value.trim()

    if (nameForm === '' || classForm === '' || majorForm === '') {
        showSimpanModal();
        return;
    }

    await axios.post(`http://localhost:3000/students`, {
        name: nameForm,
        class: classForm,
        major: majorForm
    })
        .then((response) => {
            console.log(response)
            getData();
        })
        .catch((error) => {
            console.log(error.message)
        })
}

// Method modal delete aja bos
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

// const deleteData = async (id) => {
//     if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
//         await axios.delete(`http://localhost:3000/students/${id}`)
//             .then((response) => {
//                 console.log(response)
//                 getData()
//             })
//             .catch((error) => {
//                 console.log(error.message)
//             })
//     }
// }

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
                            <button onclick="showConfirmEditModal('${students[i].id}', '${students[i].name}', '${students[i].class}', '${students[i].major}')">edit</button>
                            <button onclick="showDeleteModal('${students[i].id}')">delete</button>
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