using System.Collections.Generic;
using System.Linq.Expressions;
using System;

namespace OnlineShop.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> GetAll();
        TEntity GetById(long id);
        void Create(TEntity entity);
        void Delete(TEntity entity);
        void SaveChanges();

        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
    }
}
