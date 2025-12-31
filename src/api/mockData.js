export const mockTasks = Array.from({ length: 50 }, (_, i) => ({
    _id: `task-${i + 1}`,
    title: `Task ${i + 1} - ${["Fix Bug", "Review Code", "Write Docs", "Meeting"][i % 4]}`,
    description: "Description for task " + (i + 1),
    status: ["pending", "completed", "inprogress"][i % 3],
    priority: ["low", "medium", "high"][i % 3],
    category: ["work", "personal", "health", "urgent"][i % 4],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}));

export const mockUser = {
    _id: "user-1",
    name: "Demo User",
    email: "demo@example.com",
};

export const handleMockRequest = async ({ endpoint, method, payloadData }) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

    // Login
    if (endpoint.includes("login") && method === "POST") {
        const { email } = payloadData;
        const role = email === "admin@example.com" ? "admin" : "user";
        return { token: "mock-jwt-token", user: { ...mockUser, email, role } };
    }

    // Logout
    if (endpoint.includes("logout")) {
        return { message: "Logged out" };
    }

    // Task List (GET)
    if (endpoint.includes("task/list") && method === "GET") {
        const url = new URL("http://dummy.com" + endpoint);
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "10");
        const search = url.searchParams.get("search") || "";
        const category = url.searchParams.get("category") || "";
        const status = url.searchParams.get("status") || "";

        let filtered = mockTasks.filter(t =>
            (search ? t.title.toLowerCase().includes(search.toLowerCase()) : true) &&
            (category ? t.category === category : true) &&
            (status ? t.status === status : true)
        );

        const total = filtered.length;
        const start = (page - 1) * limit;
        const tasks = filtered.slice(start, start + limit);

        return { tasks, total, page, totalPages: Math.ceil(total / limit) };
    }

    // Task Details (GET)
    if (endpoint.includes("task/details") && method === "GET") {
        const id = endpoint.split("/").pop();
        const task = mockTasks.find(t => t._id === id);
        if (!task) throw new Error("Task not found");
        return { task };
    }

    // Task Create (POST)
    if (endpoint.includes("task/create") && method === "POST") {
        const newTask = { ...payloadData, _id: `task-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        mockTasks.unshift(newTask);
        return { task: newTask, message: "Task created" };
    }

    // Task Update (PUT)
    if (endpoint.includes("task/update") && method === "PUT") {
        const id = endpoint.split("/").pop();
        const index = mockTasks.findIndex(t => t._id === id);
        if (index > -1) {
            mockTasks[index] = { ...mockTasks[index], ...payloadData, updatedAt: new Date().toISOString() };
            return { task: mockTasks[index], message: "Task updated" };
        }
        throw new Error("Task not found");
    }

    // Task Delete (DELETE)
    if (endpoint.includes("task/delete") && method === "DELETE") {
        const id = endpoint.split("/").pop();
        const index = mockTasks.findIndex(t => t._id === id);
        if (index > -1) {
            mockTasks.splice(index, 1);
            return { message: "Task deleted" };
        }
        return { message: "Task not found" };
    }

    return null;
};
