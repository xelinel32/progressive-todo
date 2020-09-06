import http from "@/axiosConfig";

export default {
  state: {
    tasks: []
  },
  mutations: {
    setData(state, taskData) {
      return (state.tasks = taskData || []);
    },
    setUpdData(state, updTask) {
      const findTaskiD = state.tasks.findIndex(i => i.id === updTask.id);
      return (state.tasks[findTaskiD] = { ...updTask });
    },
    setNewStatus(state, status) {
      const findTaskiD = state.tasks.findIndex(i => i.id === status.id);
      return (state.tasks[findTaskiD] = { ...status });
    }
  },
  actions: {
    async sendData(ctx, task) {
      try {
        const res = await http.post("/tasks", task);
        const taskRes = await res.data.data;
        ctx.commit("setData", taskRes);
      } catch (error) {
        console.log(error);
      }
    },
    async getData(ctx) {
      try {
        const res = await http.get("/tasks");
        const taskData = await res.data;
        ctx.commit("setData", taskData);
        return taskData;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async fetchTaskById(ctx, id) {
      try {
        const res = await http.get(`/tasks/${id}`);
        const resId = await res.data;
        return resId;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateData(ctx, data) {
      try {
        const upd = await http.put(`/tasks/${data.id}`, data);
        const updData = await upd.data;
        ctx.commit("setUpdData", updData);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateStatus(ctx, id) {
      try {
        const updS = await http.get(`/tasks/${id}`);
        const resS = await updS.data;
        const resStatusNew = { ...resS, status: "outdated" };
        const upd = await http.put(`/tasks/${id}`, resStatusNew);
        const updData = await upd.data;
        ctx.commit("setNewStatus", updData);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  },
  getters: {
    getTask: s => s.tasks,
    getTaskLength: (s, getters) => getters.getTask.length,
    getTaskByActive: s => s.tasks.filter(t => t.status === "active"),
    getTaskByOutdated: s => s.tasks.filter(t => t.status === "outdated")
  }
};
