


const getTasks = async () => {
  const tasks = await Task.findAll();
  return tasks;
}

const editTask = async (id, data) => {
    const task = await Task.findByPk(id);
    if (!task) {
        throw new Error("Task not found");
    }
    await task.update(data);
    return task;
}

