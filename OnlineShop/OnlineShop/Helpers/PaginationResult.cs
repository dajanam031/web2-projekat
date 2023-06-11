using System.Collections.Generic;

namespace OnlineShop.Helpers
{
    public class PaginationResult<T>
    {
        public List<T> Data { get; set; }
        public int TotalRows { get; set; }
    }

}
