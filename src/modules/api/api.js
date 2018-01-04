const API_BASE_URL = "./api",
  IMG_BASE_URL = "http://statics.zhuishushenqi.com",
  API_CHAPTER_URL = "./chapter/",
  WEB_BASE_URL = "./spread";

module.exports = {
  API_BASE_URL,
  IMG_BASE_URL,
  WEB_BASE_URL,
  // get 首次进入app, 选择性别后获取推荐列表, url?gender='male'
  BOOK_RECOMMEND: API_BASE_URL + "/book/recommend",
  // 获取正版源(若有) 或者 盗版源
  BOOK_ABOOK_SOURCE: API_BASE_URL + "/atoc",
  // get 用户偏好设置  gender: male/ female
  USER_RECOMMEND: API_BASE_URL + "/book/recomment",

  // book detail
  // get 书籍详情
  BOOK_DETAIL: bookId => {
    return API_BASE_URL + "/book/" + bookId;
  },
  //get 热门评论
  BOOK_HOT_REVIEW: bookId =>
    API_BASE_URL + "/post/review/best-by-book?book=" + bookId,
  // get 根据ID 推荐书单
  BOOK_RECOMMEND_BOOK_LIST: bookId =>
    API_BASE_URL + "/book-list/" + bookId + "/recommend",
  // get 通过作者查询书名 url?author=
  BOOK_AUTHOR_BOOK_LIST: API_BASE_URL + "/book/accurate-search",
  /**
   * get 根据标签查询书籍列表
   * @param tags
   * @param start
   * @param limit
   */
  BOOK_TAG_BOOK_LIST: API_BASE_URL + "/book/by-tags",
  /**
   * get 获取书籍详情书评列表
   * @param book bookId
   * @param sort updated(默认排序)
   *             created(最新发布)
   *             comment-count(评论数量)
   * @param start 0
   * @param limit 20
   */
    BOOK_REVIEW_LIST: API_BASE_URL + '/post/review/by-book',


    // -------read platform-------------
    /**
     * get 获取书的章节信息
     */
    READ_BOOK_CHAPTER_LIST: (bookId) => API_BASE_URL + '/mix-atoc/' + bookId + '?view=chapters',
    /**
     * get 获取书的章节详情
     */
    READ_BOOK_CHAPTER_DETAIL: (chapterUrl) => API_CHAPTER_URL + chapterUrl,

    //--------------discover--------------
    /**
     * get 排行榜
     */
    DISCOVER_CHARTS: API_BASE_URL + '/ranking/gender',
    /**
     * get 通过ID获取排行榜详情
     * http://api.zhuishushenqi.com/ranking/564d820bc319238a644fb408
     */
    DISCOVER_CHARTS_DETAIL: (id) => {
      return API_BASE_URL + '/ranking/' + id
    },
    /**
     * get 获取主题书单列表
     * @param 本周最热 duration=last-seven-day&sort=collectorCount
     * @param 最新发布 duration=all&sort=created
     * @param 最多收藏 duration=all&sort=collectorCount
     * @param start 从多少开始请求
     * @param tag 都市, 古代, 架空, 重生, 玄幻, 网游
     * @param gender male , female
     * @param limit 20
     */
    DISCOVER_BOOK_LIST: API_BASE_URL + '/book-list',
    /**
     * get 获取主题书单标签列表
     */
    DISCOVER_BOOK_LIST_TAG: API_BASE_URL + '/book-list/tagType',
    /**
     * get 获取书单详情
     */
    DISCOVER_BOOK_LIST_DETAIL: (bookListId) => API_BASE_URL + '/book-list/' + bookListId,
    /**
     * get 获取分类
     */
    DISCOVER_CATEGORY_LIST: API_BASE_URL + '/cats/lv2/statistics',
    /**
     * get 获取二级分类
     */
    DISCOVER_CATEGORY_LIST_V2: API_BASE_URL + '/cats/lv2',
    /**
     * get 按分类获取书籍列表
     */
    DISCOVER_CATEGORY_BOOKS: API_BASE_URL + '/book/by-categories',

    // ------------community--------------
    /**
     * 获取综合讨论区帖子列表
     * @param 全部,默认排序 http://api.zhuishushenqi.com/post/by-block?block=ramble&duration=all&sort=updated&type=all&start=0&limit=20&distillate=
     * @param 精品,默认排序 http://api.zhuishushenqi.com/post/by-block?block=ramble&duration=all&sort=updated&type=all&start=0&limit=20&distillate=true
     * @param block     ramble : 综合讨论区
     *                  original: 原创区
     *                  girl: 女生去
     * @param duration  all 
     * @param sort      updated: 默认排序
     *                  created: 最新发布
     *                  comment-count: 最多评论
     * @param type      all
     * @param start     0
     * @param limit     20
     * @param distillate true(精品)
     * 
     */
    COMMUNITY_BOOK_DISCUSSION_LIST: API_BASE_URL + '/post/by-block',
    // 获取综合讨论区帖子详情
    COMMUNITY_BOOK_DISCUSSION_DETAIL: (id) => API_BASE_URL + '/post/' + id,
    // 获取神评论列表(综合讨论区 书评区 书荒区 皆为统一接口)
    COMMUNITY_BOOK_COMMENT_BEST: (id) => API_BASE_URL + '/post/' + id + '/comment/best',
    // 
    /**
     * 获取综合讨论区帖子详情内的评论列表
     * @param start 0
     * @param limit 20
     */
    COMMUNITY_BOOK_DISCUSSION_COMMENT_LIST: (id) => API_BASE_URL + '/post/' + id + '/comment',
    /**
     * 获取书评区帖子列表
     * 全部、全部类型、默认排序  http://api.zhuishushenqi.com/post/review?duration=all&sort=updated&type=all&start=0&limit=20&distillate=
     * 精品、玄幻奇幻、默认排序  http://api.zhuishushenqi.com/post/review?duration=all&sort=updated&type=xhqh&start=0&limit=20&distillate=true
     *
     * @param duration   all
     * @param sort       updated(默认排序)
     *                   created(最新发布)
     *                   helpful(最有用的)
     *                   comment-count(最多评论)
     * @param type       all(全部类型)、xhqh(玄幻奇幻)、dsyn(都市异能)...
     * @param start      0
     * @param limit      20
     * @param distillate true(精品) 、空字符（全部）
     */
    COMMUNITY_BOOK_REVIEW_LIST: API_BASE_URL + '/post/review',
    // 获取书评区帖子详情
    COMMUNITY_BOOK_REVIEW_DETAIL: (id) => API_BASE_URL + '/post/review/' + id,
    /**
     * 获取书评区书荒区帖子详情内的评论列表
     * @param start       0
     * @param limit       20
     */
    COMMUNITY_BOOK_REVIEW_COMMENT_LIST: (id) => API_BASE_URL + '/post/review/' + id + '/comment',
    /**
     * 获取书荒区帖子列表
     * 全部、默认排序  http://api.zhuishushenqi.com/post/help?duration=all&sort=updated&start=0&limit=20&distillate=
     * 精品、默认排序  http://api.zhuishushenqi.com/post/help?duration=all&sort=updated&start=0&limit=20&distillate=true
     * @param duration        all
     * @param sort            updated(默认排序)
     *                        created(最新发布)
     *                        comment-count(最多评论)
     * @param start       0
     * @param limit       20
     * @param distillate  true(精品)    空字符(全部)
     */
      COMMUNITY_BOOK_HELP_LIST: API_BASE_URL + '/post/help',
      // 获取书荒区帖子详情
      COMMUNITY_BOOK_HTLP_DETAIL: (id) => API_BASE_URL + '/post/help/' + id,



      // ----------------------search---------------------
      /**
       * get 热门关键字
       */
      SEARCH_HOT_WORD: API_BASE_URL + '/book/hot-word',
      /**
       * 关键字补全
       */
      SEARCH_AUTO_COMPLETE: API_BASE_URL + '/book/auto-complete',
      /**
       * 书籍查询
       */
      SEARCH_BOOKS: API_BASE_URL + '/book/fuzzy-search',
      // 精选列表
      SELECTION_NODES: API_BASE_URL + '/mweb/home?node=575f74f27a4a60dc78a435a3&spread=575f74f27a4a60dc78a435a3&pl=ios',
      /**
       * 获取精选列表书籍
       */
      SELECTION_NODES_BOOKS: (id) => API_BASE_URL + '/recommendPage/node/books/all/' + id
};
