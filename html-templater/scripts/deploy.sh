sh scripts/build.sh release 

rm -rf -d html-templater

mkdir html-templater

cp bin/release/html-templater html-templater
cp -r res html-templater

echo "Deploy build created."
echo "cd html-templater to find it"