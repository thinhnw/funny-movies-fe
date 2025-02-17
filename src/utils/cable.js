import { createConsumer } from "@rails/actioncable";

const cable = createConsumer(`${process.env.NEXT_PUBLIC_WS_URL}/cable`);

export default cable;