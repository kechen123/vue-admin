<script setup lang="ts">
import { reactive } from 'vue'

// 静态数据
const stats = [
  { title: 'New Visits', value: 426425, icon: 'el-icon-s-home', color: '#409eff' },
  { title: 'Messages', value: 25411, icon: 'el-icon-message', color: '#67c23a' },
  { title: 'Purchases', value: 133511, icon: 'el-icon-shopping-cart-1', color: '#e6a23c' },
  { title: 'Shoppings', value: 5123320, icon: 'el-icon-shopping-bag-1', color: '#f56c6c' },
]

// 折线图配置
const lineOption = reactive({
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Email', 'Union Ads'],
  },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
      smooth: true,
      lineStyle: { width: 3 },
      areaStyle: {},
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
      smooth: true,
      lineStyle: { width: 3 },
      areaStyle: {},
    },
  ],
})

// 雷达图配置
const radarOption = reactive({
  tooltip: {},
  radar: {
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 },
    ],
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: 'Allocated Budget',
          areaStyle: { opacity: 0.2 },
        },
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: 'Actual Spending',
          areaStyle: { opacity: 0.2 },
        },
      ],
    },
  ],
})

// 环形图配置
const pieOption = reactive({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: 0,
    left: 'center',
  },
  series: [
    {
      name: 'Access Source',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}: {d}%',
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
    },
  ],
})
</script>

<template>
  <el-container style="height: 100vh;">
    <!-- 左侧菜单示例 -->
    <el-aside width="200px" style="background: #fff; border-right: 1px solid #ebeef5;">
      <el-menu default-active="1" router>
        <el-menu-item index="1">
          <i class="el-icon-house"></i>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <i class="el-icon-setting"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="2-1">用户管理</el-menu-item>
          <el-menu-item index="2-2">角色管理</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span>表格示例</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部 -->
      <el-header
        style="background: #fff; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;">
        <h2>Vue3 Admin</h2>
        <el-input placeholder="搜索..." prefix-icon="el-icon-search" size="small" style="width: 200px;"></el-input>
      </el-header>

      <!-- 内容 -->
      <el-main style="padding: 20px; background: #f5f7fa; overflow-y: auto;">
        <!-- 指标卡片 -->
        <el-row :gutter="20" style="margin-bottom: 20px;">
          <el-col :span="6" v-for="(item, idx) in stats" :key="idx">
            <el-card shadow="hover" style="display: flex; align-items: center; padding: 20px;">
              <i :class="item.icon" :style="{ fontSize: '32px', color: item.color, marginRight: '15px' }"></i>
              <div>
                <div style="font-weight: 600; font-size: 18px;">{{ item.title }}</div>
                <div style="color: #909399; font-size: 14px; margin-top: 5px;">{{ item.value.toLocaleString() }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 图表区域 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card shadow="hover" style="height: 350px;">
              <h3>Stacked Line</h3>
              <ECharts :options="lineOption" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" style="height: 350px;">
              <h3>Basic Radar Chart</h3>
              <ECharts :options="radarOption" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" style="height: 350px;">
              <h3>Donut Chart</h3>
              <ECharts :options="pieOption" />
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>
