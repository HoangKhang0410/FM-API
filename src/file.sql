CREATE FUNCTION search_students (@studentName nvarchar(255))
RETURNS TABLE
AS
RETURN
(
    SELECT * FROM users
    WHERE "users".role = 'student' AND "users".name LIKE '%' + @studentName + '%'
)




SELECT  id AS "users".id, 
        COUNT(class_id) as register_class_count, 
        (SELECT COUNT(id) FROM class) - COUNT(class_id) AS unregister_class_count
FROM users LEFT JOIN enroll ON "users".id = "enroll".student_id GROUP BY "users".id
HAVING "users".role = "student"