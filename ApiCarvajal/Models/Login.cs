using System.ComponentModel.DataAnnotations;

namespace ApiCarvajal.Models
{
    public class Login
    {
        [Key]
        public string Correo { get; set; }
        public string Contraseña { get; set; }
    }
}
