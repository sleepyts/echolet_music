#!/bin/bash

# ==============================================
# 配置参数（可根据需求修改）
# ==============================================
TARGET_DIR="${1:-.}"  # 目标目录：默认当前目录，可通过第一个参数指定
FILE_FORMATS=("js" "vue" "ts" "jsx" "tsx" "css" "scss" "html" "md" "sh")  # 要统计的文件格式
EXCLUDE_DIRS=("node_modules" ".git" ".vscode" "dist" "build" "coverage")  # 要排除的目录
DEBUG_MODE=false  # 调试模式：true 会输出匹配到的所有文件路径（便于排查排除问题）

# ==============================================
# 参数校验
# ==============================================
if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ 错误：目录 $TARGET_DIR 不存在！"
  exit 1
fi

# ==============================================
# 构建查找命令
# ==============================================
# 构建排除目录的条件
EXCLUDE_CONDITIONS=()
if [ ${#EXCLUDE_DIRS[@]} -gt 0 ]; then
    for dir in "${EXCLUDE_DIRS[@]}"; do
        EXCLUDE_CONDITIONS+=(-name "$dir" -o)
    done
    # 删除数组末尾多余的 -o
    unset 'EXCLUDE_CONDITIONS[${#EXCLUDE_CONDITIONS[@]}-1]'
fi

# 构建文件格式的条件
FORMAT_CONDITIONS=()
for fmt in "${FILE_FORMATS[@]}"; do
  FORMAT_CONDITIONS+=(-name "*.$fmt" -o)
done
# 删除数组末尾多余的 -o
unset 'FORMAT_CONDITIONS[${#FORMAT_CONDITIONS[@]}-1]'

# ==============================================
# 统计行数
# ==============================================
echo "============================================"
echo "📂 统计目录：$TARGET_DIR"
echo "🔍 统计格式：${FILE_FORMATS[*]}"
echo "🚫 排除目录：${EXCLUDE_DIRS[*]}"
[ "$DEBUG_MODE" = true ] && echo "🔧 调试模式已开启（将输出所有匹配文件路径）"
echo "============================================"
echo

# 初始化总行数
TOTAL_LINES=0

# 准备 find 命令数组
FIND_CMD=(find "$TARGET_DIR")

# 添加排除目录的逻辑
# 格式为：\( -name "dir1" -o -name "dir2" \) -type d -prune -o
if [ ${#EXCLUDE_CONDITIONS[@]} -gt 0 ]; then
    FIND_CMD+=(\( "${EXCLUDE_CONDITIONS[@]}" \) -type d -prune -o)
fi

# 添加匹配文件格式的逻辑并执行打印
# 格式为：\( -name "*.ext1" -o -name "*.ext2" \) -type f -print0
FIND_CMD+=(\( "${FORMAT_CONDITIONS[@]}" \) -type f -print0)

# 执行 find 命令并通过管道处理结果
"${FIND_CMD[@]}" | while IFS= read -d $'\0' -r file; do
    # 调试模式：输出匹配到的文件路径
    [ "$DEBUG_MODE" = true ] && echo "🔍 匹配文件：$file"
    
    # 统计单个文件行数（使用 grep -c . 来统计非空行）
    LINE_COUNT=$(grep -c . "$file")
    
    # 输出单个文件统计，使用 printf 保证对齐
    printf "📄 %-70s: %d 行\n" "$file" "$LINE_COUNT"
    
    # 累加总行数
    TOTAL_LINES=$((TOTAL_LINES + LINE_COUNT))
done

# ==============================================
# 输出结果
# ==============================================
echo
echo "============================================"
echo "🎉 统计完成！"
echo "📊 符合条件的文件总行数（不含空行）：$TOTAL_LINES"
echo "============================================"