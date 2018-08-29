const Service = require('egg').Service

class TopicService extends Service {
  /**
   * 获取用户limit 文章列表
   */
  async getArticleList(authorId, pagination) {
    const { ctx } = this
    pagination = pagination || {limit: 10, skip: 0}
    let params = {
      orders:[['createTime','desc'], ['id', 'desc']],
      limit: pagination.limit,
      offset: pagination.skip
    }
    if (authorId) {
      params = Object.assign(params, {authorId: authorId})
    }
    const result = await this.app.mysql.select('article', params)
    return result
  }

  /**
   * 获取固定id文章
   */
  async getArticleById(id) {
    const result = await this.app.mysql.get('article', {id: id})
    return result
  }


  /**
   * 新增文章
   */
  async newAndSave (title, content, summary, tab, authorId) {
    const result = await this.app.mysql.insert('article', 
      { 
        title, content, summary, tab, authorId, createTime: this.app.mysql.literals.now
      }
      );
    return result
  }

  /**
   * 保存文章
   */
  async save (id, title, content, summary, tab) {
    const row = {
      id,
      title,
      content,
      summary,
      tab,
      modifytime: this.app.mysql.literals.now
    }
    const result = await this.app.mysql.update('article', row)
    
    return result
  }

  /**
   * 增加阅读量
   */
  async addView (id) {
    return await this.app.mysql.query('update article set view = (view + ?) where id = ?', [1, id])
  }

  /**
   * 文章喜欢
   */
  async toggleLike(articleId, current_user) {
    // 获取文章作者id
    let article = await this.app.mysql.get('article', {
      id: articleId
    })
    // 文章喜欢表中查询 不存在 新增一条记录
    let status = await this.app.mysql.query('update thumbs set status = !status, modifyTime = now() where articleId = ? and userId = ?', [articleId, current_user.id])
    if (!status.changedRows) {
      status = await this.app.mysql.query('insert into thumbs values(0, ?, ?, now(), now(), 1)', [articleId, current_user.id])
    }

    // 更新文章表中文章喜欢数量

    // 更新文章表中文章喜欢数量
    const data = await this.app.mysql.get('thumbs', {
      articleId: articleId,
      userId: current_user.id
    })
    await this.app.mysql.query('update article set likeNum = (likeNum + ?) where id = ?', [data.status ? 1 : -1, articleId])

    // 更新用户表中喜欢数量
    
    await this.app.mysql.query('update user set likeNum = (likeNum + ?) where id = ?', [data.status ? 1 : -1, article.authorId])

    return status && data
  }

  /**
   * 热门文章
   * @param  {[type]} day [description]
   * @return {[type]}     [description]
   */
  async topArticle (day = 7) {
    return await this.app.mysql.query('select * from article where to_days(now()) - to_days(createtime) < ? order by view desc', [day])
  }

}

module.exports = TopicService