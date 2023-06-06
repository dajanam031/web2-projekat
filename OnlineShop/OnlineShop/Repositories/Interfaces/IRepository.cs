using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace OnlineShop.Repositories.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> GetById(params object[] keys);
        Task Create(TEntity entity);
        void Delete(TEntity entity);
        Task SaveChanges();

        Task<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate);
        Task<IEnumerable<TEntity>> FindAllBy(Expression<Func<TEntity, bool>> predicate);
    }
}
