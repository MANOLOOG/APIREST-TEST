import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    // throw new Error("My error");
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE id_employee = ?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({
        message: "employee not found",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employees (id_employee, name, salary) VALUES (null, ?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM employees WHERE id_employee = ?",
      [req.params.id]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id_employee = ?",
      [name, salary, id]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({ mesagge: "Employee not found" });

    const [rows] = await pool.query(
      "SELECT * FROM employee WHERE id_employee = ?",
      [id]
    );

    console.log(result);

    res.json(rows[0]);
  } catch (error) {
    return res.status(404).json({ mesagge: "Something went wrong" });
  }
};
