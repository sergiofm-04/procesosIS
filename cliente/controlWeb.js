function ControlWeb() {
    this.mostrarAgregarUsuario = function() {
        let cadena = '<div id="mAU" class="form-group">';
        cadena = cadena + '<label for="nick">Name:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena + '</div>';
        $("#au").append(cadena);
        $("#btnAU").on("click", function() {
            let nick = $("#nick").val();
            rest.agregarUsuario(nick);
            $("#mAU").remove();
        });
    }

        // Componente de visualización para otras operaciones
        this.mostrarPanelOperaciones = function() {
                const panel = `
                <div id="panelOps" class="card mt-4">
                    <div class="card-header">Operaciones Usuarios</div>
                    <div class="card-body">
                        <div class="form-row">
                            <div class="col-md-3 mb-2">
                                <button id="btnListar" class="btn btn-outline-primary btn-block">Obtener Usuarios</button>
                            </div>
                            <div class="col-md-3 mb-2">
                                <button id="btnNum" class="btn btn-outline-secondary btn-block">Número Usuarios</button>
                            </div>
                            <div class="col-md-3 mb-2">
                                <input id="nickActivo" class="form-control" placeholder="nick activo" />
                            </div>
                            <div class="col-md-3 mb-2">
                                <button id="btnActivo" class="btn btn-outline-info btn-block">Usuario Activo?</button>
                            </div>
                        </div>
                        <div class="form-row mt-2">
                            <div class="col-md-3 mb-2">
                                <input id="nickEliminar" class="form-control" placeholder="nick eliminar" />
                            </div>
                            <div class="col-md-3 mb-2">
                                <button id="btnEliminar" class="btn btn-outline-danger btn-block">Eliminar Usuario</button>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h6>Resultado:</h6>
                            <pre id="resultadoUsuarios" style="min-height:120px;background:#f8f9fa;padding:10px;border:1px solid #ddd;white-space:pre-wrap;"></pre>
                        </div>
                    </div>
                </div>`;
                if (!$("#panelOps").length) {
                        $("#au").append(panel);
                }

                const mostrarResultado = (obj) => {
                        $("#resultadoUsuarios").text(typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2));
                };

                $("#btnListar").off('click').on('click', function(){
                        $.getJSON('/obtenerUsuarios', function(data){
                                mostrarResultado(data);
                        }).fail(function(jqxhr, textStatus, err){
                                mostrarResultado('Error listar: '+textStatus+' '+err);
                        });
                });

                $("#btnNum").off('click').on('click', function(){
                        $.getJSON('/numeroUsuarios', function(data){
                                mostrarResultado(data);
                        }).fail(function(jqxhr, textStatus, err){
                                mostrarResultado('Error numero: '+textStatus+' '+err);
                        });
                });

                $("#btnActivo").off('click').on('click', function(){
                        const nick = $('#nickActivo').val().trim();
                        if(!nick){ mostrarResultado('Introduce nick'); return; }
                        $.getJSON('/usuarioActivo/'+encodeURIComponent(nick), function(data){
                                mostrarResultado({ nick, activo: !!(data && data.res) });
                        }).fail(function(jqxhr, textStatus, err){
                                mostrarResultado('Error activo: '+textStatus+' '+err);
                        });
                });

                $("#btnEliminar").off('click').on('click', function(){
                        const nick = $('#nickEliminar').val().trim();
                        if(!nick){ mostrarResultado('Introduce nick a eliminar'); return; }
                        $.getJSON('/eliminarUsuario/'+encodeURIComponent(nick), function(data){
                                mostrarResultado({ nick, eliminado: !!(data && data.removed) });
                        }).fail(function(jqxhr, textStatus, err){
                                mostrarResultado('Error eliminar: '+textStatus+' '+err);
                        });
                });
        }
}
