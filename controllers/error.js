const error = (req, res) => {
    res.send(`
        <div>
            <h1 style="text-align:center">404 PAGE NOT FOUND</h1>
        </div>
    `);
}
export {error};