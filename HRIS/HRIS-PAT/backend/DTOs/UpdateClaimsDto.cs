using System.Collections.Generic;

namespace backend.DTOs;

public class UpdateClaimsDto
{
    public List<string> Claims { get; set; } = new();
}
