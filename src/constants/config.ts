export const config = {
	apiBaseUrl:
		process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8939/api/v1",
	minioBaseUrl:
		process.env.NEXT_PUBLIC_MINIO_BASE_URL || "http://localhost:9000",
};
