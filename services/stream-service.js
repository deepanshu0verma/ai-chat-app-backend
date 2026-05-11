import { createDataStream } from 'ai';

/**
 * Handles complex stream logic like merging data with the AI response.
 */
export const formatStreamResponse = async (res, result) => {
  const dataStream = createDataStream({
    execute: (writer) => {
      // You can inject custom data into the stream here
      writer.writeData({ type: 'status', value: 'streaming_started' });
    }
  });

  return result.mergeIntoDataStream(dataStream);
};