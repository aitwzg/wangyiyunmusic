<template>
  <div>
    <van-search
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
      @input="inputFn"
    />
    <!-- 搜索下面的容器 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <!-- 每一个热门关键词容器 -->
        <span
          v-for="(obj, index) in hotArr"
          :key="index"
          class="hot_item"
          @click="fn(obj.first)"
          >{{ obj.first }}</span
        >
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="obj in resultList"
          :key="obj.ar[0].id"
          center
          :title="obj.name"
          size="large"
          :label="obj.ar[0].name + ' - ' + obj.name"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.7rem" />
          </template>
        </van-cell> -->
        <SongItem
          v-for="obj in resultList"
          :key="obj.id"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
        ></SongItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchReasultListAPI } from "@/api";
import SongItem from "@/components/SongItem";

export default {
  data() {
    return {
      value: "",
      hotArr: [], // 热搜关键字
      resultList: [], //搜索结果
      list: [],
      loading: false,
      finished: false,
      page: 1,
      timer: null,
    };
  },
  async created() {
    const res = await hotSearchAPI();
    // console.log(res);
    this.hotArr = res.data.result.hots;
  },
  methods: {
    async getListFn() {
      return await searchReasultListAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
    },
    async fn(val) {
      this.value = val;
      this.page = 1;
      // await 拿到Promise 对象
      const res2 = await this.getListFn();
      // console.log(res2);
      this.resultList = res2.data.result.songs;
    },
    async inputFn() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        if (this.value.length === 0) {
          this.resultList = [];
          return;
        }
        this.finished = false;
        this.page = 1;

        // await 拿到Promise 对象
        const res2 = await this.getListFn();
        if (res2.data.result.songs === undefined) {
          this.resultList = [];
          return;
        }
        // console.log(res2.data.result.songs);
        this.resultList = res2.data.result.songs;
        this.loading = false;
        
      }, 1000);
    },
    async onLoad() {
      this.page++;
      const res2 = await this.getListFn();

      if (res2.data.result.songs === undefined) {
        this.finished = true;
        return;
      }
      this.resultList = [...this.resultList, ...res2.data.result.songs];
      this.loading = false;
    },
  },
  components: {
    SongItem,
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
/* .van-list {
  padding-bottom: 1rem;
} */
</style>