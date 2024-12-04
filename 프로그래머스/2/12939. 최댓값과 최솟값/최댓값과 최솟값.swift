func solution(_ s:String) -> String {
    let temp = s.split(separator: " ").compactMap { Int($0) }
    var max = String(temp.max()!)
    var min = String(temp.min()!)
    let answer = "\(min) \(max)"
    
    return answer
}