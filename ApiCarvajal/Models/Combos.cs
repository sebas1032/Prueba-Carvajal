using System.ComponentModel.DataAnnotations;

namespace ApiCarvajal.Models
{
    public class Combos

    {
        [Key]
        public int codigo { get; set; }
        public string valor { get; set; }
    }

    public class CombosRespuesta
    {
        public Respuesta respuesta { get; set; }
        public List<Combos> combos { get; set; }
    }
}
