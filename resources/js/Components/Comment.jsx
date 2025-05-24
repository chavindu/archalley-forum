import UserName from '@/Components/UserName';

<div className="flex items-center space-x-2">
    <UserName user={comment.author} />
    {comment.is_best_answer && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Best Answer
        </span>
    )}
</div> 