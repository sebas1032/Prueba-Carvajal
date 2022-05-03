using System.ComponentModel.DataAnnotations;

namespace ApiCarvajal.Models
{
    public class Respuesta
    {
        [Key]
        public string Codigo { get; set; }
        public string Mensaje { get; set; }
    }
}
