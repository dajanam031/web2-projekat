using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace OnlineShop.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> GetById(long id);
        Task Create(TEntity entity);
        void Delete(TEntity entity);
        Task SaveChanges();

        Task<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate);
        Task<IEnumerable<TEntity>> FindAllBy(Expression<Func<TEntity, bool>> predicate);
    }
}
