var app = new Vue({
    el: '#app',
    data: {
        message: 'Registro de citas de la clínica',
        tareas: [],
        nuevaTarea: {
            nombrePaciente: '',
            apellidoPaciente: '',
            telefono: '',
            fecha: '',
            tipo: '',
            descripcionCita: '',
            estado: false
        },
        searchQuery: ''
    },
    methods: {
        agregarTarea: function() {
            if (this.nuevaTarea.nombrePaciente.trim() !== '' && this.nuevaTarea.apellidoPaciente.trim() !== '' && this.nuevaTarea.fecha.trim() !== '' && this.nuevaTarea.tipo.trim() !== '') {
                this.tareas.push({
                    nombrePaciente: this.nuevaTarea.nombrePaciente,
                    apellidoPaciente: this.nuevaTarea.apellidoPaciente,
                    telefono: this.nuevaTarea.telefono,
                    fecha: this.nuevaTarea.fecha,
                    tipo: this.nuevaTarea.tipo,
                    descripcionCita: this.nuevaTarea.descripcionCita,
                    estado: false
                });
                this.nuevaTarea.nombrePaciente = '';
                this.nuevaTarea.apellidoPaciente = '';
                this.nuevaTarea.telefono = '';
                this.nuevaTarea.fecha = '';
                this.nuevaTarea.tipo = '';
                this.nuevaTarea.descripcionCita = '';
                localStorage.setItem('citas-vue', JSON.stringify(this.tareas));
            }
        },
        editarTarea: function(index) {
            this.tareas[index].estado = 'Atendido';
            localStorage.setItem('citas-vue', JSON.stringify(this.tareas));
        },
        marcarPendiente: function(index) {
            this.tareas[index].estado = false;
            localStorage.setItem('citas-vue', JSON.stringify(this.tareas));
        },
        eliminar: function(index) {
            this.tareas.splice(index, 1);
            localStorage.setItem('citas-vue', JSON.stringify(this.tareas));
        }
    },
    computed: {
        filteredTareas() {
            return this.tareas.filter(tarea => {
                return tarea.nombrePaciente.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                       tarea.apellidoPaciente.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                       tarea.telefono.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                       tarea.fecha.includes(this.searchQuery) ||
                       tarea.tipo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                       tarea.descripcionCita.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        }
    },
    created: function() {
        let datosDB = JSON.parse(localStorage.getItem('citas-vue'));
        if (datosDB === null) {
            this.tareas = [];
        } else {
            this.tareas = datosDB;
        }
    }
});
