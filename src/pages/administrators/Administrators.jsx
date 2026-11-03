import { message, Modal, Space, Table } from "antd";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { DeleteOutlined } from "@ant-design/icons";
import AddAdmin from "./AddAmin";
import AdminEdit from "./AdminEdit";
import { useState } from "react";
import { useAllAdmins } from "../../api/adminApi";

function Administrators() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const { allAdmins, isLoading, isError, error, refetch } =
    useAllAdmins(filter);

  const handleTableChange = (pagination) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  // delete confirm modal
  const showDeleteConfirm = (adminId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this admin?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          // await API.post(`/admin-dashboard/delete-user/`, {
          //   user_id: adminId,
          // });
          message.success("Admin deleted successfully!");
          refetch();
        } catch (err) {
          message.error(err.response?.data?.error || "Failed to delete admin");
        }
      },
    });
  };

  const columns = [
    {
      title: <span>Sl no.</span>,
      dataIndex: "serial_number",
      key: "serial_number",
      align: "center",
      render: (text, record, index) => (
        <span className="">
          #{index + 1 + (filter.page - 1) * filter.limit}
        </span>
      ),
    },
    {
      title: <span>Name</span>,
      dataIndex: "full_name",
      key: "full_name",
      align: "center",
      render: (full_name) => <span className="">{full_name}</span>,
    },
    {
      title: <span>Email</span>,
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (email) => <span className="">{email}</span>,
    },
    {
      title: <span>Phone</span>,
      dataIndex: "phone",
      key: "phone",
      align: "center",
      render: (phone) => <span className="">{phone}</span>,
    },
    {
      title: <span>Has Access To</span>,
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (role) => <span className="">{role}</span>,
    },
    {
      title: <span>Action</span>,
      key: "action",
      align: "center",
      render: (_, record) => {
        const isSuperAdmin = record.role === "superadmin";

        return (
          <Space size="middle">
            <AdminEdit adminProfile={record} refetch={refetch} />

            <DeleteOutlined
              className={`text-[23px] bg-[#E30000] p-1 rounded-sm text-white ${
                isSuperAdmin
                  ? "cursor-not-allowed opacity-50"
                  : "hover:text-red-300 cursor-pointer"
              }`}
              onClick={
                isSuperAdmin ? undefined : () => showDeleteConfirm(record.id)
              }
            />
          </Space>
        );
      },
    },
  ];

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  return (
    <div className="">
      <AddAdmin refetch={refetch} />

      <Table
        columns={columns}
        dataSource={allAdmins}
        rowKey="id"
        loading={isLoading}
        pagination={false}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default Administrators;
