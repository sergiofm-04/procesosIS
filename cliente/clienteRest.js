function ClienteRest() {
    this.agregarUsuario = function(nick) {
        var cli = this;
        $.getJSON("/agregarUsuario/" + nick, function(data) {
            if (data.nick != -1) {
                console.log("Usuario " + nick + " ha sido registrado");
            }
            else {
                console.log("El nick ya está ocupado");
            }
        })
    }

    this.agregarUsuario2 = function(nick) {
        var cli = this;
        $.ajax({
            type: 'GET',
            url: '/agregarUsuario/' + nick,
            success: function(data) {
                if (data.nick != -1) {
                    console.log("Usuario " + nick + " ha sido registrado");
                } else {
                    console.log("El nick ya está ocupado");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    }

    this.obtenerUsuarios = function() {
        $.getJSON("/obtenerUsuarios", function(data) {
            console.log("Usuarios obtenidos:", data);
        }).fail(function(jqxhr, textStatus, error) {
            console.log("Error al obtener usuarios:", textStatus, error);
        });
    }

    this.numeroUsuarios = function() {
        $.getJSON("/numeroUsuarios", function(data) {
            if (data && typeof data.num !== 'undefined') {
                console.log("Número de usuarios:", data.num);
            } else {
                console.log("Respuesta inesperada:", data);
            }
        }).fail(function(jqxhr, textStatus, error) {
            console.log("Error al obtener número de usuarios:", textStatus, error);
        });
    }

    this.usuarioActivo = function(nick) {
        $.getJSON("/usuarioActivo/" + encodeURIComponent(nick), function(data) {
            if (data && data.res) {
                console.log("El usuario " + nick + " está activo");
            } else {
                console.log("El usuario " + nick + " NO está activo");
            }
        }).fail(function(jqxhr, textStatus, error) {
            console.log("Error al comprobar usuario activo:", textStatus, error);
        });
    }

    this.eliminarUsuario = function(nick) {
        $.ajax({
            type: 'GET',
            url: '/eliminarUsuario/' + encodeURIComponent(nick),
            dataType: 'json',
            success: function(data) {
                if (data && data.removed) {
                    console.log("Usuario " + nick + " eliminado");
                } else {
                    console.log("No se encontró el usuario " + nick);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Error al eliminar usuario:", textStatus, errorThrown);
            }
        });
    }
}
