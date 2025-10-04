function Sistema() {
    this.usuarios={};

    this.agregarUsuario=function(nick) { 
        let res={"nick":-1};

        if (!this.usuarios[nick]) {
            this.usuarios[nick]=new Usuario(nick);
            res.nick=nick;
        }
        else {
            console.log("el nick "+nick+" está en uso");
        }

        return res;
    } 

    this.obtenerUsuarios=function() {
        return this.usuarios;
    }

    this.usuarioActivo=function(nick) {
        return { res: this.usuarios[nick] !== undefined };
    }

    this.eliminarUsuario=function(nick) {
        if (this.usuarios[nick]) {
            delete this.usuarios[nick];
            return { removed: true };
        }
        return { removed: false };
    }

    this.numeroUsuarios=function() {
        return { num: Object.keys(this.usuarios).length };
    }
}

function Usuario(nick){
    this.nick=nick;
}

module.exports.Sistema = Sistema;
