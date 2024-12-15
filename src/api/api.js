/**
 * Copyright 2024 Son of Binary
 * The Fantasktick Project
 * This module makes it easy to access server APIs for managing tasks
 */



class API {


    /**
     * This method lists tasks on the server
     * @param {object} param0 
     * @param {number} param0.page
     * @param {Task} param0.filters
     * @param {string} param0.search
     * @returns {Promise<Task[]>}
     */
    async list({ page = 1, filters, search }) {
        return await this.request(
            {
                path: `/list?page=${page}${filters ? `&${new URLSearchParams(filters)}` : ''}${search ? `&search=${search}` : ''}`,
            }
        )
    }

    /**
     * This method creates a new task on the server
     * @param {Task} data
     */
    async create(data) {
        return await this.request({
            path: '/create',
            method: 'POST',
            body: data,
        })
    }


    /**
     * This method edits a task
     * @param {Task & {id: string}} data
     */
    async update(data) {
        return await this.request({
            path: '/update',
            method: 'POST',
            body: data
        })
    }

    async request({ path, method = 'GET', body }) {
        const response = await (await fetch(
            new URL(path, API.SERVER_URL).href,
            {
                method,
                body: method?.toUpperCase() == 'POST' ? JSON.stringify(body) : undefined,
            }
        )).json()

        if (!(response.success ?? true)) {
            throw new Error(response.error || `${response}`)
        }
        return response.data;
    }

    /** @readonly */
    static SERVER_URL = 'http://localhost:8000'

}

const api = new API();

export default api;